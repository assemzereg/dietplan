from main.extensions import db
from main.shared.base_model import BaseModel


class Plat(BaseModel):
    __tablename__ = 'plats'

    diet_id = db.Column(db.Integer, db.ForeignKey(
        'diets.id'), primary_key=True)
    food_id = db.Column(db.Integer, db.ForeignKey(
        'foods.id'), primary_key=True)


class Diet(BaseModel):
    __tablename__ = 'diets'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    ingredients = db.relationship(
        'Food', secondary='plats', backref=db.backref('diets', lazy='dynamic'))


class Food(BaseModel):
    __tablename__ = 'foods'

    id = db.Column(db.Integer, primary_key=True)
    weight = db.Column(db.Float, nullable=False)
    choices = db.Column(db.String)
