from .db import db


class Task(db.Model):
    __tablename__ = 'tasks'
  
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text)
    description = db.Column(db.Text)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    assignees_id = db.Column(db.ARRAY(db.Integer), nullable=True)  
    section_id = db.Column(db.Integer, db.ForeignKey("sections.id"), nullable=False)
    status = db.Column(db.String(100))
    priority = db.Column(db.String(100))
    end_date = db.Column(db.Date)
    completed = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False)

    owner = db.relationship("User", backref='user', primaryjoin='Task.owner_id==User.id', lazy=True) 
    tasks = db.relationship("Section", backref='section_tasks', lazy=True)
    section = db.relationship("Section", primaryjoin='Task.section_id==Section.id', lazy=True)
    subtasks = db.relationship("SubTask", back_populates='task', cascade='all, delete')

    def to_dict(self):
        task_project = self.section.projects.to_task_dict()
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
            'assignees_id': self.assignees_id, 
            'section_id': self.section_id,
            'project': task_project,
            'status' : self.status,
            'priority' : self.priority,
            'end_date' : endDate,
            'plain_format_date': self.end_date,
            'completed' : self.completed,
            'tasks': [subtask.to_dict() for subtask in self.subtasks],  
            'created_at' : self.created_at,
            'updated_at' : self.updated_at
        } 