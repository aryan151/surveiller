from app.models import db, Section, Section2, Section3, Section4
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
        title='Closed',
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
        title='Closed',
        tasks_order=[],
        created_at=today,
        updated_at=today)

    db.session.add(section1)
    db.session.add(section2)
    db.session.add(section3)
    db.session.add(section4)
    db.session.add(section5)
    db.session.add(section6)
    db.session.add(section7)
    db.session.add(section8)


    section11 = Section2(
        project_id=1,
        board_column=0,
        title='Main Store',
        info='avalible to sell',
        tasks_order=[],
        created_at=today,
        updated_at=today) 
    
    section12 = Section2(
        project_id=1,
        board_column=1,
        title='Transit',
        info = 'eta 1 week',
        tasks_order=[],
        created_at=today,
        updated_at=today)
    
    section13 = Section2(
        project_id=1,
        board_column=2,
        title='Warehouse 1',
        info='',
        tasks_order=[],
        created_at=today,
        updated_at=today)

    section14 = Section2(
        project_id=1,
        board_column=3,
        title='Warehouse 2',
        info='empty', 
        tasks_order=[], 
        created_at=today,
        updated_at=today)


    db.session.add(section11)
    db.session.add(section12)
    db.session.add(section13)
    db.session.add(section14) 

    section21 = Section3(
        project_id=1,
        board_column=0,
        title='Main Site',
        info='',
        tasks_order=[],
        created_at=today,
        updated_at=today) 
    
    section22 = Section3(
        project_id=1,
        board_column=1,
        title='Warehouse',
        info = '',
        tasks_order=[],
        created_at=today,
        updated_at=today)
    
    section23 = Section3(
        project_id=1,
        board_column=2,
        title='Remote',
        info='',
        tasks_order=[],
        created_at=today,
        updated_at=today) 

    section24 = Section3(
        project_id=1,
        board_column=3,
        title='Leave', 
        info='empty', 
        tasks_order=[], 
        created_at=today,
        updated_at=today) 


    db.session.add(section21)
    db.session.add(section22)
    db.session.add(section23)  
    db.session.add(section24) 


    section41 = Section4(
        project_id=1,
        board_column=0,
        title='Recently Assigned',
        info='',
        tasks_order=[],
        created_at=today,
        updated_at=today) 
    
    section42 = Section4(
        project_id=1,
        board_column=1,
        title='Do Today',
        info = '',
        tasks_order=[],
        created_at=today,
        updated_at=today)
    
    section43 = Section4(
        project_id=1,
        board_column=2,
        title='Do Next Week',
        info='',
        tasks_order=[],
        created_at=today,
        updated_at=today) 

    section44 = Section4(
        project_id=1,
        board_column=3,
        title='Do Later',  
        info='empty', 
        tasks_order=[], 
        created_at=today, 
        updated_at=today) 


    db.session.add(section41)
    db.session.add(section42)
    db.session.add(section43)  
    db.session.add(section44) 







    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_sections():
    db.session.execute('TRUNCATE sections RESTART IDENTITY CASCADE;')
    db.session.commit()