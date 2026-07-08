import json
from pathlib import Path

from app.database import SessionLocal

from app.models.user import User
from app.models.course import Course
from app.models.enrollment import Enrollment


BASE_DIR = Path(__file__).resolve().parent.parent

USERS_FILE = BASE_DIR / "data" / "users.json"
COURSES_FILE = BASE_DIR / "data" / "courses.json"


def seed_database():
    db = SessionLocal()

    try:
        db.query(Enrollment).delete()
        db.query(User).delete()
        db.query(Course).delete()

        with open(USERS_FILE, "r", encoding="utf-8") as file:
            users = json.load(file)

        with open(COURSES_FILE, "r", encoding="utf-8") as file:
            courses = json.load(file)

        for user in users:
            db.add(
                User(
                    id=user["id"],
                    first_name=user["firstName"],
                    last_name=user["lastName"],
                    email=user["email"],
                    password=user["password"],
                    role=user["role"],
                    status=user["status"],
                )
            )

        for course in courses:
            db.add(
                Course(
                    id=course["id"],
                    code=course["code"],
                    name=course["name"],
                    category=course["category"],
                    level=course["level"],
                    duration_hours=course["durationHours"],
                    status=course["status"],
                    instructor=course["instructor"],
                    short_description=course["shortDescription"],
                    description=course["description"],
                    enrolled_students=course["enrolledStudents"],
                )
            )

        db.commit()

        print(f"Inserted {len(users)} users.")
        print(f"Inserted {len(courses)} courses.")
        print("Seed completed successfully.")

    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
