from .db import db


class Task2(db.Model):
    __tablename__ = 'tasks2' 
  
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text)
    description = db.Column(db.Text)
    quantity = db.Column(db.Integer) 
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    section_id = db.Column(db.Integer, db.ForeignKey("sections.id"), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False)

    owner = db.relationship("User", backref='user', primaryjoin='Task2.owner_id==User.id', lazy=True) 
    tasks = db.relationship("Section2", backref='section2_tasks', lazy=True)
    section = db.relationship("Section2", primaryjoin='Task2.section_id==Section2.id', lazy=True) 

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
            'quantity': self.quantity,  
            'section_id': self.section_id,
            'plain_format_date': self.end_date,
            'created_at' : self.created_at,
            'updated_at' : self.updated_at
        } 