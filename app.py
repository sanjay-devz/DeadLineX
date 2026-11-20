"""Small Flask API for DeadlineX. Tasks are stored in Firebase Firestore."""

import os
from datetime import datetime, timedelta, timezone

from flask import Flask, jsonify, request, send_from_directory
from firebase_admin import firestore, initialize_app

ROOT = os.path.dirname(os.path.abspath(__file__))
app = Flask(__name__, static_folder="static", static_url_path="/static")
_db = None


def database():
    """Create the Firebase connection on first use (uses Google credentials env)."""
    global _db
    if _db is None:
        try:
            initialize_app()
        except ValueError:  # Firebase was already initialized by a reload.
            pass
        _db = firestore.client()
    return _db


def task_from_document(document):
    task = document.to_dict() or {}
    task["id"] = document.id
    deadline = task.get("deadline")
    if hasattr(deadline, "isoformat"):
        task["deadline"] = deadline.isoformat()
    return task


@app.get("/")
def home():
    return send_from_directory(ROOT, "index.html")


@app.get("/api/health")
def health():
    return jsonify({"ok": True, "firebase": "configured" if os.getenv("GOOGLE_APPLICATION_CREDENTIALS") else "needs-credentials"})


@app.get("/api/tasks")
def list_tasks():
    try:
        db = database()
        docs = list(db.collection("tasks").stream())
        seed_marker = db.collection("settings").document("demo_seeded")
        if not docs and not seed_marker.get().exists:
            # A few examples make a first visit feel less like an empty form.
            now = datetime.now().astimezone()
            examples = [
                ("Reading response: The Odyssey", "A short reflection on books nine and ten.", "Modern Literature", "Assignment", 0, 18, "Low", True),
                ("Organic chemistry lab report", "Add observations and analysis from this week's experiment.", "Organic Chemistry", "Lab Record", 1, 23, "High", False),
                ("Statistics problem set 4", "Exercises 1 to 12 from chapter six.", "Statistics", "Assignment", 2, 18, "Medium", False),
                ("Group presentation slides", "Share the final deck with your project group.", "Environmental Science", "Project", 4, 14, "Medium", False),
                ("Midterm exam: Calculus II", "Review integration techniques and series.", "Calculus II", "Exam", 7, 9, "High", False),
            ]
            batch = db.batch()
            for title, description, subject, category, offset, hour, priority, completed in examples:
                deadline = now.replace(hour=hour, minute=0, second=0, microsecond=0) + timedelta(days=offset)
                reference = db.collection("tasks").document()
                batch.set(reference, {"title": title, "description": description, "subject": subject,
                                      "category": category, "deadline": deadline.isoformat(),
                                      "priority": priority, "completed": completed,
                                      "createdAt": now.isoformat(), **({"completedAt": now.isoformat()} if completed else {})})
            batch.set(seed_marker, {"done": True, "createdAt": now.isoformat()})
            batch.commit()
            docs = list(db.collection("tasks").stream())
        tasks = [task_from_document(doc) for doc in docs]
        tasks.sort(key=lambda task: task.get("deadline", ""))
        return jsonify(tasks)
    except Exception as error:
        app.logger.exception("Could not read tasks from Firebase")
        return jsonify({"error": "Firebase is not ready. Check your service account setup.", "detail": str(error)}), 503


def validate_task(data):
    required = ("title", "subject", "deadline", "category", "priority")
    if not isinstance(data, dict):
        return "Send task details as JSON."
    for key in required:
        if not str(data.get(key, "")).strip():
            return f"Please add a {key}."
    if len(data["title"].strip()) > 120:
        return "Task titles must be 120 characters or less."
    if data["category"] not in ("Assignment", "Exam", "Lab Record", "Project", "Other"):
        return "Choose a valid task category."
    if data["priority"] not in ("Low", "Medium", "High"):
        return "Choose Low, Medium, or High priority."
    try:
        datetime.fromisoformat(data["deadline"].replace("Z", "+00:00"))
    except (ValueError, AttributeError):
        return "Choose a valid deadline."
    return None


@app.post("/api/tasks")
def create_task():
    data = request.get_json(silent=True) or {}
    problem = validate_task(data)
    if problem:
        return jsonify({"error": problem}), 400
    task = {key: data.get(key) for key in ("title", "description", "subject", "deadline", "category", "priority")}
    task.update({"completed": bool(data.get("completed", False)), "createdAt": datetime.now(timezone.utc).isoformat()})
    if data.get("completedAt"):
        task["completedAt"] = data["completedAt"]
    try:
        reference = database().collection("tasks").document()
        reference.set(task)
        task["id"] = reference.id
        return jsonify(task), 201
    except Exception as error:
        app.logger.exception("Could not save task to Firebase")
        return jsonify({"error": "Could not save the task. Check your Firebase setup.", "detail": str(error)}), 503


@app.route("/api/tasks/<task_id>", methods=["PUT", "DELETE"])
def edit_or_delete_task(task_id):
    reference = database().collection("tasks").document(task_id)
    if request.method == "DELETE":
        try:
            if not reference.get().exists:
                return jsonify({"error": "Task not found."}), 404
            reference.delete()
            return jsonify({"ok": True})
        except Exception as error:
            app.logger.exception("Could not delete task from Firebase")
            return jsonify({"error": "Could not delete the task. Check your Firebase setup.", "detail": str(error)}), 503

    data = request.get_json(silent=True) or {}
    problem = validate_task(data)
    if problem:
        return jsonify({"error": problem}), 400
    try:
        if not reference.get().exists:
            return jsonify({"error": "Task not found."}), 404
        task = {key: data.get(key) for key in ("title", "description", "subject", "deadline", "category", "priority")}
        task["completed"] = bool(data.get("completed", False))
        task["completedAt"] = data.get("completedAt")
        reference.update(task)
        task["id"] = task_id
        return jsonify(task)
    except Exception as error:
        app.logger.exception("Could not update task in Firebase")
        return jsonify({"error": "Could not update the task. Check your Firebase setup.", "detail": str(error)}), 503


if __name__ == "__main__":
    app.run(debug=True, port=int(os.getenv("PORT", "5000")))
