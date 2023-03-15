To start the server:

- Create venv with `python -m venv venv`
- Install requirements `pip install -r requirements.txt`
- Start docker compose `docker-compose up -d`
- Run `run.py` with PyCharm.
- Execute migrations `flask db upgrade`
- Visit `localhost:5433`
- Create a user and go to `localhost:5000/users`
