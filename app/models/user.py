from sqlalchemy import null
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

project_members_join = db.Table(
   'project_members',
    db.Column("project_id", db.Integer, db.ForeignKey("projects.id"), primary_key=True),
    db.Column("member_id", db.Integer, db.ForeignKey("users.id"), primary_key=True)
    )
    
class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    avatar = db.Column(db.String(500), nullable=True, default='https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg') 
    notepad = db.Column(db.Text, default="") 
    hashed_password = db.Column(db.String(255), nullable=False)

    projects = db.relationship("Project", backref='user_project') 
    project_participants = db.relationship('Project', secondary=project_members_join, lazy="subquery",passive_deletes=True, backref=db.backref('project_members', lazy=True))
 
    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)  


    def to_dict(self):
        projects = {}
        for project in self.user_projects:
            projects[project.id] = {
                'project_id': project.id,
                'project_title': project.title, 
            } 
        return {
            'id': self.id,
            'name': self.name,
            'avatar': self.avatar, 
            'email': self.email,
            'projects' : projects 
        }
