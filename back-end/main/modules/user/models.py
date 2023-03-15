from enum import unique
from main.extensions import db
from main.shared.base_model import BaseModel, HasCreatedAt, HasUpdatedAt


class User(BaseModel, HasCreatedAt, HasUpdatedAt):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    userName = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    birthday = db.Column(db.Date, nullable=False)
    gender = db.Column(db.String, nullable=False)
    weight = db.Column(db.Float, nullable=False)
    height = db.Column(db.Float, nullable=False)
    disease = db.Column(db.String, nullable=False)
    type = db.Column(db.String)
