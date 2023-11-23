from sqlalchemy.sql import func
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Uidmapper(db.Model):
    # repository = db.Column(db.String(100), primary_key=True)
    repository = db.Column(db.String(100), nullable=False)
    uid = db.Column(db.String(100), primary_key=True)
    connection_url = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())

    def __repr__(self):
        return f'<Uidmapper {self.connection_url}>'