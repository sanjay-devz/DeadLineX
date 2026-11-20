# DeadlineX

A small academic deadline planner built with HTML, CSS, JavaScript, Python, Flask, and Firebase Firestore.

## Run it locally

1. Install Python 3.10 or newer.
2. Open a terminal in this project folder and create a virtual environment:

   ```bash
   python -m venv .venv
   ```

3. Activate it:

   - Windows PowerShell: `.venv\Scripts\Activate.ps1`
   - macOS or Linux: `source .venv/bin/activate`

4. Install the Python packages and start Flask:

   ```bash
   pip install -r requirements.txt
   python app.py
   ```

5. Visit [http://127.0.0.1:5000](http://127.0.0.1:5000).

The first run shows sample coursework. If Firebase is not connected yet, the page stays usable in demo mode and saves changes in this browser's local storage.

## Connect Firebase Firestore

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com/).
2. In **Build → Firestore Database**, create a database. Choose a region close to you.
3. In **Project settings → Service accounts**, generate a private key JSON file.
4. Keep that file somewhere private, outside this project folder. Never commit or share it.
5. Set `GOOGLE_APPLICATION_CREDENTIALS` to the full path of the JSON file, then restart Flask.

   - macOS or Linux: `export GOOGLE_APPLICATION_CREDENTIALS="/path/to/private-key.json"`
   - Windows PowerShell: `$env:GOOGLE_APPLICATION_CREDENTIALS="C:\path\to\private-key.json"`

Flask creates a `tasks` collection automatically. A new Firestore database gets example tasks once, which you can edit or remove. A `settings/demo_seeded` document prevents those examples from coming back after you clear the tasks.

## Project map

- `index.html` is the page structure.
- `static/styles.css` contains the layout, colors, and responsive styles.
- `static/app.js` renders the screens and handles task actions.
- `app.py` serves the site and the JSON API.
- `requirements.txt` lists the Python packages.

This is a learning project. The Flask development server and service-account approach are intended for local development, not a public production deployment. A public app should add user sign-in and access controls before storing real student data.
