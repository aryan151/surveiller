from email.policy import default
from .db import db


class Task3(db.Model):
    __tablename__ = 'tasks3' 
  
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text)  
    description = db.Column(db.Text) 
    contact = db.Column(db.Text)    
    image = db.Column(db.String(400), default = 'https://media.istockphoto.com/vectors/male-profile-flat-blue-simple-icon-with-long-shadow-vector-id522855255?k=20&m=522855255&s=612x612&w=0&h=fLLvwEbgOmSzk1_jQ0MgDATEVcVOh_kqEe0rqi7aM5A=')
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    section_id = db.Column(db.Integer, db.ForeignKey("sections.id"), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False)

    owner = db.relationship("User", backref='user', primaryjoin='Task3.owner_id==User.id', lazy=True) 
    tasks = db.relationship("Section3", backref='section3_tasks', lazy=True)
    section = db.relationship("Section3", primaryjoin='Task3.section_id==Section3.id', lazy=True) 

    def to_dict(self):  
        endDate = None
        if self.end_date: 
            endDate = self.end_date.strftime("%b %-d '%y")
        else:
            endDate = None


        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'owner': self.owner.to_dict(),
            'contact': self.contact,    
            'image': self.image, 
            'section_id': self.section_id,
            'plain_format_date': self.end_date, 
            'created_at' : self.created_at,
            'updated_at' : self.updated_at
        } 