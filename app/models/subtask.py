from .db import db


class SubTask(db.Model):
    __tablename__ = 'sub_tasks' 
    id = db.Column(db.Integer, primary_key=True)
    task_id = db.Column(db.Integer, db.ForeignKey('tasks.id'), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    completed = db.Column(db.Boolean, default=False)

    project = db.relationship('Task', back_populates='tasks') 

    def to_dict(self):
        return {
            "id": self.id,
            "taskId": self.task_id,
            "description": self.description,
            "completed": self.completed 
        }