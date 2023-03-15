from datetime import datetime

from main.extensions import db


class BaseModel(db.Model):
    __abstract__ = True

    def __init__(self, form_data=None, commit=False, *args, **kwargs):
        # Creation.
        if form_data:
            # {'email': 'a@a.a', 'password': '123', 'role': 'standard'}
            for key in list(form_data.keys()):  # ['email', 'password', 'role']
                if not hasattr(self, key):
                    # On supprime les keys unknown pour le model courant.
                    form_data.pop(key)

                form_data.update(kwargs)  # override.
                kwargs = form_data  # {'email': 'a@a.a', 'password': '123'}
        super().__init__(*args, **kwargs)  # **kwargs => email='a@a.a', password='123'
        db.session.add(self)

        if commit:
            db.session.commit()

    def update(self, form_data=None, commit=False, **kwargs):
        if form_data:
            form_data.update(kwargs)
            kwargs = form_data

        for key, value in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, value)

        if commit:
            db.session.commit()

    def destroy(self, commit=False):
        db.session.delete(self)

        if commit:
            db.session.commit()

# form_data = {'email': 'a@a.a', 'password': '123'}
# user = User(form_data, password=hash(form_data['password']) commit=True)
# user.update({'email': 'a_updated@a.a'}, commit=True)
# user.destroy(True)


class HasCreatedAt:
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class HasUpdatedAt:
    updated_at = db.Column(db.DateTime)
