# Simple Backend (FastAPI)

A minimal FastAPI backend to accompany the Tic Tac Toe frontend. It provides:
- GET / -> {"status": "ok"}
- GET /health -> {"health": "ok"}

This backend is intended to run separately from the Vite frontend and uses port 3010 to avoid conflicts with Vite on port 3000.

## Setup

1) Create and activate a virtual environment (recommended)

On macOS/Linux:
    python3 -m venv .venv
    source .venv/bin/activate

On Windows (PowerShell):
    python -m venv .venv
    .\.venv\Scripts\Activate.ps1

2) Install dependencies
    pip install --upgrade pip
    pip install -r requirements.txt

3) Run the development server (do not use port 3000 to avoid Vite conflict)
    uvicorn main:app --reload --host 0.0.0.0 --port 3010

Then open http://localhost:3010 in your browser:
- / -> returns {"status":"ok"}
- /health -> returns {"health":"ok"}
- /docs -> Swagger UI
- /redoc -> ReDoc

## Notes
- Keep this backend independent from the frontend. No changes to the frontend are required.
- Configure any integration from the frontend via environment variables (e.g., VITE_API_BASE), if needed in future tasks.
