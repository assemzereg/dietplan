from flask import Blueprint
from flask.globals import request
from flask.json import jsonify
from main.modules.user.models import User
from main.shared.base_api import BaseAPI
from main.modules.user.schemas import UserSchema

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

blueprint = Blueprint('user', __name__, url_prefix='/api')


# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.

@blueprint.route('/token', methods=['POST'])
def create_token():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(userName=username).first()
    if not(user) or password != user.password:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=username)
    return jsonify({'access_token': access_token, 'user': UserSchema().dump(user)}), 200


class UserAPI(BaseAPI):
    route_base = 'users'

    model = User
    schema = UserSchema


UserAPI.register(blueprint)
