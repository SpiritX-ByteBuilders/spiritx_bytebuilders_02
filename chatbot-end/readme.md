python -m venv fastapi-env
fastapi-env\Scripts\activate 
pip install -r requirements.txt
uvicorn main:app --reload