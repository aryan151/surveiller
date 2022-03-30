from .db import db
from .user import project_members_join 

class Project3(db.Model):
    __tablename__ = 'projects3' 

    id = db.Column(db.Integer, primary_key=True) 
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False) 


    sections = db.relationship("Section3", backref='section',cascade="all, delete, delete-orphan", lazy=True)  

 
 


    def to_dict(self):

        sections = {section.id:section.to_dict() for section in self.project3_sections}
        section_board_columns = {section.id:section.board_column for section in self.project3_sections}
        sections_order = sorted(section_board_columns.items(), key=lambda x: x[1])  
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'owner_id': self.owner_id,
            'sections': sections,
            'sections_order': sections_order,
            'created_at' : self.created_at,
            'updated_at' : self.updated_at
        }

    def to_task_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,  
            'created_at' : self.created_at,
            'updated_at' : self.updated_at
        } 