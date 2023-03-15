from datetime import datetime
from flask import Blueprint, jsonify
from flask.globals import request
from main.shared.base_api import BaseAPI
from main.modules.diet.models import Diet
from main.modules.diet.schemas import DietSchema
from main.model import classifier
from dateutil.relativedelta import relativedelta

# B = [1, 2, 3, 4, 16, 17, 18, 19]
B1 = [1, 2, 3, 4]
B2 = [16, 17, 18, 19]
# L = [5, 6, 7, 8, 20, 21, 22, 23]
L1 = [5, 6, 7, 8]
L2 = [20, 21, 22, 23]
# S = [9, 10, 11, 24, 24, 24, 24, 24]
S = [9, 10, 11, 24]
# D = [12, 13, 14, 15, 12, 13, 14, 15]
D = [12, 13, 14, 15]


blueprint = Blueprint('diet', __name__, url_prefix="/api")


@blueprint.route('/regime', methods=['POST'])
def generate_diet():
    if request.method == "POST":
        dietName = request.json.get("dietName", None)
        user = request.json.get("user", None)
        if user:
            if user['disease'] == 'diabetes':
                # disease = 1
                # if user['type'] == 'Type1':
                #     type = 1
                # else:
                #     type = 10
                bloodSugarLevel = request.json.get("bloodL", None)
            else:
                # disease = 0
                bloodSugarLevel = 0
            #     type = 0
            # age = relativedelta(
            #     datetime.today(), datetime.fromisoformat(user['birthday'])).years
            # dietkey = classifier.predict(
            #     [[user['weight'],  user['height'],  age,  disease,  type, bloodSugarLevel]])
            # if dietName == "breakfast":
            #     diet = Diet.query.filter_by(
            #         id=B[int(dietkey[0])]).first()
            # elif dietName == "lunch":
            #     diet = Diet.query.filter_by(
            #         id=L[int(dietkey[0])]).first()
            # elif dietName == "snack":
            #     diet = Diet.query.filter_by(
            #         id=S[int(dietkey[0])]).first()
            # elif dietName == "dinner":
            #     diet = Diet.query.filter_by(
            #         id=D[int(dietkey[0])]).first()
            dietkey = classifier.predict(
                [[user['weight'],  user['height']]])
            if dietName == "breakfast":
                if float(bloodSugarLevel) > 1:
                    diet = Diet.query.filter_by(
                        id=B2[int(dietkey[0])]).first()
                else:
                    diet = Diet.query.filter_by(
                        id=B1[int(dietkey[0])]).first()
            elif dietName == "lunch":
                if float(bloodSugarLevel) > 1:
                    diet = Diet.query.filter_by(
                        id=L2[int(dietkey[0])]).first()
                else:
                    diet = Diet.query.filter_by(
                        id=L1[int(dietkey[0])]).first()
            elif dietName == "snack":
                if float(bloodSugarLevel) > 1:
                    diet = Diet.query.filter_by(
                        id=S[int(dietkey[0])]).first()
                else:
                    diet = Diet.query.filter_by(
                        id=24).first()
            elif dietName == "dinner":
                diet = Diet.query.filter_by(
                    id=D[int(dietkey[0])]).first()
            print(DietSchema().dump(diet))
            return jsonify({'diet': DietSchema().dump(diet)}), 200
            # return "success", 200
        else:
            return jsonify({'msg': 'you are not even loged in'}), 401
            # print("error")
            # return "error", 401


class DietAPI(BaseAPI):
    route_base = 'diets'

    model = Diet
    schema = DietSchema


DietAPI.register(blueprint)
