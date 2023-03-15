from flask_classful import FlaskView


# TODO: Remove Classful.
class BaseView(FlaskView):
    __abstract__ = True

    trailing_slash = False
