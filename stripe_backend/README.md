
### Backend Setup

- download and install python3.10
- cd backend
- Create a virtual environment with: python3 -m venv venv
- Activate the virtual environment: source venv/bin/activate (linux/ubuntu) or .\venv\Scripts\activate (Windows)
- Run: pip install -r requirements.txt
- Run: python manage.py migrate
- Run: python manage.py runserver
- navigate to `http://127.0.0.1:8000/`.

