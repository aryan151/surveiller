from app.models import db, Task, Section
from datetime import date, datetime
today = date.today()

def seed_tasks():
    task1 = Task(
        title='Fix database relationship error',
        description='There is a joins table relationship error in the ProjectMembers joins table',
        owner_id=1,
        section_id=1,
        status="At Risk",
        priority="High",
        end_date=today,
        created_at=today,
        updated_at=today)
    task2 = Task(
        title='Style landing page',
        description='Add more padding and colors to the landing page',
        owner_id=1,
        section_id=2,
        status="At Risk",
        priority="Low",
        end_date=today,
        created_at=today,
        updated_at=today)
    task3 = Task(
        title='Fix JSON error in project create route',
        description='We are getting an unexpected token error in the JSON return message in our project api route.',
        owner_id=2,
        section_id=3,
        status="On Track",
        priority="Medium",
        end_date=today,
        created_at=today,
        updated_at=today)
    task4 = Task(
        title='Upgrade PostgreSQL database',
        description='We made changes to the data structure so update the database to reflect new column additon proposal',
        owner_id=2,
        section_id=3,
        status="On Track",
        priority="Medium",
        end_date=today,
        created_at=today,
        updated_at=today)
    task5 = Task(
        title='Debug event listener not firing',
        description='On scroll event listener is not firing to change header background color',
        owner_id=1,
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