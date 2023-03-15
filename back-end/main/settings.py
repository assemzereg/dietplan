class Settings:
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class DevSettings(Settings):
    DEBUG = True
    # user:password@host:port/db
    SQLALCHEMY_DATABASE_URI = 'postgresql://root:toor@localhost:5432/dietPlan'


class ProdSettings(Settings):
    SQLALCHEMY_DATABASE_URI = ''
