from app.models import db, User, Project
from datetime import date
today = date.today()

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        full_name='Devin Smith', email='demo@aa.io', password='password')
    marnie = User(
        full_name='Mike Tran', email='marnie@aa.io', password='password')
    bobbie = User(
        full_name='Ben Houser', email='bobbie@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    project1 = Project(
        title='Site A Renovations',
        description='This is a test description',
        owner_id=1,
        created_at=today,
        updated_at=today)

    project2 = Project(
        title='Quaterly Showcase',
        description='This is a test description',
        owner_id=1,
        created_at=today,
        updated_at=today)

    #Inventory 
    project3 = Project(
        title='Inventory',
        description='This is a test description',
        owner_id=1,
        type = 1,
        created_at=today,
        updated_at=today)

    #Workers
    project4 = Project(
        title='Employees', 
        description='This is a test description',
        owner_id=1,
        type = 2,
        created_at=today,
        updated_at=today)
    
    #To DO 
    project5 = Project(
        title='To Do',
        description='This is a test description', 
        owner_id=1,
        type = 3, 
        created_at=today,
        updated_at=today) 

    db.session.add(project1)
    db.session.add(project2)
    db.session.add(project3)
    db.session.add(project4) 
    db.session.add(project5)

    project1.project_members.append(demo)
    project1.project_members.append(marnie)
    project2.project_members.append(demo)

    project3.project_members.append(demo)
    project4.project_members.append(demo)  
    project5.project_members.append(demo)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE projects RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
