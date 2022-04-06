from app.models import comment, db, Section
from datetime import date
today = date.today()

# Adds a demo user, you can add other users here if you want
def seed_sections():
    section1 = Section(
        project_id=1,
        board_column=0,
        tasks_order=[1],
        title='Backlog',
        created_at=today,
        updated_at=today)
    section2 = Section(
        project_id=1,
        board_column=1,
        tasks_order=[2],
        title='Open',
        created_at=today,
        updated_at=today)
    section3 = Section(
        project_id=1,
        board_column=2,
        tasks_order=[3,4,5],
        title='In Progress',
        created_at=today,
        updated_at=today)
    section4 = Section(
        project_id=1,
        board_column=3,
        title='Complete',
        created_at=today,
        updated_at=today)

    section455 = Section(
        project_id=1,
        board_column=4,
        title='Canceled',
        created_at=today,
        updated_at=today)  
        
    section5 = Section(
        project_id=2,
        board_column=0,
        tasks_order=[],
        title='Backlog',
        created_at=today,
        updated_at=today)
    section6 = Section(
        project_id=2,
        board_column=1,
        tasks_order=[],
        title='Open',
        created_at=today,
        updated_at=today)
    section7 = Section(
        project_id=2,
        board_column=2,
        tasks_order=[],
        title='In Progress',
        created_at=today,
        updated_at=today)
    section8 = Section(
        project_id=2,
        board_column=3,
        title='Complete', 
        tasks_order=[],
        created_at=today,
        updated_at=today)
    section888 = Section( 
        project_id=2,
        board_column=3,
        title='Canceled',
        tasks_order=[],
        created_at=today,
        updated_at=today)

#Inventory 
    section9 = Section(
        project_id=3,
        board_column=0,
        tasks_order=[],
        title='On Shelf',
        created_at=today,
        updated_at=today)
    section10 = Section(
        project_id=3,
        board_column=1,
        tasks_order=[],
        title='In Transit',
        created_at=today,
        updated_at=today)
    section11 = Section(
        project_id=3,
        board_column=2,
        tasks_order=[],
        title='Production',
        created_at=today,
        updated_at=today)
    section12 = Section(
        project_id=3,
        board_column=3,
        title='Broken',
        tasks_order=[],
        created_at=today, 
        updated_at=today)

#Employees 
    section13 = Section(
        project_id=4,
        board_column=0,
        tasks_order=[],
        title='Available',
        created_at=today,
        updated_at=today)
    section14 = Section(
        project_id=4,
        board_column=1,
        tasks_order=[],
        title='UnActive',
        created_at=today,
        updated_at=today)
    section15 = Section(
        project_id=4,
        board_column=2,
        tasks_order=[],
        title='Trainees',
        created_at=today,
        updated_at=today) 
    section16 = Section(
        project_id=4,
        board_column=3,
        title='Applicants',
        tasks_order=[],
        created_at=today, 
        updated_at=today)
    
  #To Do 
    section17 = Section(
        project_id=5,
        board_column=0,
        tasks_order=[],
        title='Recently assigned', 
        created_at=today,
        updated_at=today)
    section18 = Section(
        project_id=5,
        board_column=1,
        tasks_order=[],
        title='Do today', 
        created_at=today,
        updated_at=today)
    section19 = Section(
        project_id=5,
        board_column=2,
        tasks_order=[],
        title='Do next week', 
        created_at=today,
        updated_at=today)
    section20 = Section(
        project_id=5,
        board_column=3, 
        title='Do later',
        tasks_order=[],
        created_at=today, 
        updated_at=today)

    db.session.add(section1)
    db.session.add(section2)
    db.session.add(section3)
    db.session.add(section4)
    db.session.add(section455)
    db.session.add(section5)
    db.session.add(section6) 
    db.session.add(section7)
    db.session.add(section8)
    db.session.add(section888)  
    db.session.add(section9)
    db.session.add(section10)
    db.session.add(section11)
    db.session.add(section12)
    db.session.add(section13)
    db.session.add(section14)
    db.session.add(section15)
    db.session.add(section16)
    db.session.add(section17) 
    db.session.add(section18)
    db.session.add(section19)
    db.session.add(section20) 

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_sections():
    db.session.execute('TRUNCATE sections RESTART IDENTITY CASCADE;')
    db.session.commit()
