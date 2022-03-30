from .db import db


class Task4(db.Model):
    __tablename__ = 'tasks4' 
  
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text)
    description = db.Column(db.Text) 
    owner_id = db.Column(db.Integer, nullable=False)
    section_id = db.Column(db.Integer, db.ForeignKey("sections4.id"), nullable=False)
    completed = db.Column(db.Boolean, default=False, nullable=False) 
    created_at = db.Column(db.DateTime(timezone=True), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False) 

  
    tasks = db.relationship("Section4", backref='section4_tasks', lazy=True)
    section = db.relationship("Section4", primaryjoin='Task4.section_id==Section4.id', lazy=True) 
 
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
            'section_id': self.section_id,
            'plain_format_date': self.end_date,
            'completed' : self.completed,  
            'created_at' : self.created_at,
            'updated_at' : self.updated_at
        } 