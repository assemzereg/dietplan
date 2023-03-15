from marshmallow import fields, pre_load, ValidationError

from main.extensions import ma
from main.modules.diet.models import Diet, Food


class FoodSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Food
    weight = fields.Float()
    choices = fields.Str()


class DietSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Diet
    name = fields.Str()
    ingredients = ma.Nested(FoodSchema, many=True)
