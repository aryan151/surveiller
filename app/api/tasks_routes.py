from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.api.auth_routes import login
from app.models import User, db, Project, Section, Task 
from operator import itemgetter
import sqlalchemy
from datetime import datetime
today = datetime.now()

tasks_routes = Blueprint('tasks', __name__)

@tasks_routes.route('/<int:id>')
@login_required
def getTask(id):
    task = Task.query.get(id)
    return task.to_dict()

@tasks_routes.route('/<int:id>/complete')
@login_required
def toggleComplete(id):
    task = Task.query.get(id)
    task.completed = not task.completed
    db.session.commit()
    return task.to_dict()


@tasks_routes.route('/', methods=['POST'])
@login_required
def createTask():
    userId = current_user.get_id()
    sectionId,position = itemgetter('sectionId', 'position')(request.json)
    try:
        section = Section.query.get(sectionId)
        newTask = Task(
            section_id=sectionId,
            title="",
            description="",
            owner_id=userId,
            completed=False,
            created_at=today,
            updated_at=today
        )
        db.session.add(newTask)
        db.session.commit()
        db.session.refresh(newTask)
        newTaskOrder = section.tasks_order
        section.tasks_order = []
        db.session.commit()
        db.session.refresh(section)
        if position == 'end':
            newTaskOrder.append(newTask.id)
        else:
            newTaskOrder.insert(0,newTask.id)
        section.tasks_order = newTaskOrder
        db.session.commit()

        return newTask.to_dict()
    except AssertionError as message:
        print(str(message))
        return jsonify({"error": str(message)}), 400    

@tasks_routes.route('/<int:id>/delete', methods=['POST'])
@login_required
def deleteTask(id):
    sectionId = itemgetter('sectionId')(request.json)
    try:
        task = Task.query.get(id)
        db.session.delete(task)
        db.session.commit()
        section = Section.query.get(sectionId)
        newTasksOrder = section.tasks_order
        section.tasks_order = []
        db.session.commit()
        db.session.refresh(section)
        newTasksOrder.remove(id)
        section.tasks_order = newTasksOrder
        db.session.commit()
        print("Deleted")
        return {'Message':"Successfully deleted."}
    except AssertionError as message:
        print(str(message))
        return jsonify({"error": str(message)}), 400


@tasks_routes.route('/<int:id>', methods=['POST'])
@login_required
def updateTask(id):
    title, description,end_date,assignee,priority,status, projectId = itemgetter('title', 'description','end_date','priority','status', 'projectId')(request.json)
    try:
        project=Project.query.get(projectId)
        user = User.query.get(assignee)
        task = Task.query.get(id)
        task.title = title
        task.description = description
        if end_date == 'null': 
            task.end_date = db.null()
        else:
            task.end_date = end_date 
        if priority == "---":
            task.priority = db.null()
        else:
            task.priority = priority
        if status == "---":
            task.status = db.null()
        else:
            task.status = status

        db.session.commit()
        return task.to_dict()
    except AssertionError as message:
        print(str(message))
        return jsonify({"error": str(message)}), 400