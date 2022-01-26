from .db import db

class Project(db.Model):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False) 
    created_at = db.Column(db.DateTime(timezone=True), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False) 


    sections = db.relationship("Section", backref='section',cascade="all, delete, delete-orphan", lazy=True)



    def to_dict(self):

        sections = {section.id:section.to_dict() for section in self.project_sections}
        section_board_columns = {section.id:section.board_column for section in self.project_sections}
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