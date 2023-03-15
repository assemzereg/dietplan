from marshmallow import fields, pre_load, ValidationError

from main.extensions import ma
from main.modules.user.models import User


def vaildate_weight(value):
    if (value > 130 or value < 25):
        raise ValidationError("not a valid weight")


def vaildate_height(value):
    if (value > 2.5 or value < 1.2):
        raise ValidationError("not a valid height")


class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User
        load_only = ('password',)
        dump_only = ('id',)
    id = fields.Int()
    userName = fields.Str()
    email = fields.Email()
    birthday = fields.Date('%Y-%m-%d')
    gender = fields.Str()
    weight = fields.Float(validate=vaildate_weight)
    height = fields.Float(validate=vaildate_height)
    disease = fields.Str()
    type = fields.Str()

    @pre_load
    def lower_user_ids(self, data, **kwargs):
        email = data.get('email', None)

        if email:
            data['email'] = email.lower()

        return data
