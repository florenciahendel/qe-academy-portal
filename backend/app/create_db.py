from app.database import Base, engine

from app.models.user import User
from app.models.course import Course
from app.models.enrollment import Enrollment


def create_database():
    Base.metadata.create_all(bind=engine)


if __name__ == "__main__":
    create_database()
    print("Database created successfully.")