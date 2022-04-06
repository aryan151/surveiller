from app.models import db, Task, Comment, section
from datetime import date, datetime
today = date.today()
# Adds a demo user, you can add other users here if you want
def seed_tasks():
    task1 = Task(
        title='test',
        description='test',
        owner_id=1,
        assignee_id=2,
        section_id=1,
        status="At Risk",
        priority="High",
        end_date=today,
        created_at=today,
        updated_at=today)
    task2 = Task(
        title='test',
        description='test',
        owner_id=1,
        assignee_id=1,
        section_id=2,
        status="At Risk",
        priority="Low",
        end_date=today,
        created_at=today,
        updated_at=today)
    task3 = Task(
        title='test',
        description='test',
        owner_id=2,
        assignee_id=1,
        section_id=3,
        status="On Track",
        priority="Medium",
        end_date=today,
        created_at=today,
        updated_at=today)
    task4 = Task(
        title='test',
        description='test',
        owner_id=2,
        assignee_id=1,
        section_id=3,
        status="On Track",
        priority="Medium",
        end_date=today,
        created_at=today,
        updated_at=today)
    task5 = Task(
        title='test',
        description='test',
        owner_id=1,
        assignee_id=2, 
        section_id=3,
        status="On Track",
        priority="Medium",
        end_date=today,
        created_at=today,
        updated_at=today)


    db.session.add(task1)
    db.session.add(task2)
    db.session.add(task3)
    db.session.add(task4)
    db.session.add(task5)

    comment1 = Comment(
        user_id=1,
        comment='noted',
        created_at=today,
        updated_at=today)

    comment2 = Comment(
        user_id=2,
        comment='Working on it!', 
        created_at=today,
        updated_at=today)

    comment3 = Comment(
        user_id=1,
        comment='test',
        created_at=today,
        updated_at=today)

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)

    task1.task_comments.append(comment1)
    task1.task_comments.append(comment2)
    task2.task_comments.append(comment3)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_tasks():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE tasks RESTART IDENTITY CASCADE;')
    db.session.commit()
