from fastapi import FastAPI
from fastapi import HTTPException
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy import select

from app.database import SessionLocal

from app.models.user import User
from app.models.course import Course
from app.models.enrollment import Enrollment

from app.schemas import (
    UserResponse,
    CourseResponse,
    CourseCreate,
    CourseUpdate,
    EnrollmentResponse,
    EnrollmentCreate,
    LoginRequest,
)


app = FastAPI(
    title="QE Academy Portal API",
    version="0.1.0",
    description="Backend API for QE Academy Portal",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://qe-academy-portal.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "QE Academy Portal API"
    }


@app.get("/health")
def health():
    return {
        "status": "ok"
    }


@app.post(
    "/login",
    response_model=UserResponse,
)
def login(credentials: LoginRequest):
    db = SessionLocal()

    try:
        user = db.scalars(
            select(User).where(
                User.email == credentials.email
            )
        ).first()

        if not user or user.password != credentials.password:
            raise HTTPException(
                status_code=401,
                detail="Invalid credentials",
            )

        if user.status != "Active":
            raise HTTPException(
                status_code=403,
                detail="User is inactive",
            )

        return user

    finally:
        db.close()


@app.get(
    "/users",
    response_model=list[UserResponse],
)
def get_users():
    db = SessionLocal()

    try:
        return db.scalars(
            select(User)
        ).all()

    finally:
        db.close()


@app.get(
    "/users/{user_id}",
    response_model=UserResponse,
)
def get_user(user_id: str):
    db = SessionLocal()

    try:
        user = db.get(User, user_id)

        if not user:
            raise HTTPException(
                status_code=404,
                detail="User not found",
            )

        return user

    finally:
        db.close()


@app.get(
    "/courses",
    response_model=list[CourseResponse],
)
def get_courses():
    db = SessionLocal()

    try:
        return db.scalars(
            select(Course)
        ).all()

    finally:
        db.close()


@app.get(
    "/courses/{course_id}",
    response_model=CourseResponse,
)
def get_course(course_id: int):
    db = SessionLocal()

    try:
        course = db.get(
            Course,
            course_id,
        )

        if not course:
            raise HTTPException(
                status_code=404,
                detail="Course not found",
            )

        return course

    finally:
        db.close()


@app.post(
    "/courses",
    response_model=CourseResponse,
)
def create_course(course_data: CourseCreate):
    db = SessionLocal()

    try:
        existing_course = db.scalars(
            select(Course).where(
                Course.code == course_data.code
            )
        ).first()

        if existing_course:
            raise HTTPException(
                status_code=400,
                detail="Course code already exists",
            )

        new_course = Course(
            code=course_data.code,
            name=course_data.name,
            category=course_data.category,
            level=course_data.level,
            duration_hours=course_data.duration_hours,
            status=course_data.status,
            instructor=course_data.instructor,
            short_description=course_data.short_description,
            description=course_data.description,
            enrolled_students=0,
        )

        db.add(new_course)
        db.commit()
        db.refresh(new_course)

        return new_course

    finally:
        db.close()


@app.put(
    "/courses/{course_id}",
    response_model=CourseResponse,
)
def update_course(
    course_id: int,
    course_data: CourseUpdate,
):
    db = SessionLocal()

    try:
        course = db.get(
            Course,
            course_id,
        )

        if not course:
            raise HTTPException(
                status_code=404,
                detail="Course not found",
            )

        existing_course = db.scalars(
            select(Course).where(
                Course.code == course_data.code,
                Course.id != course_id,
            )
        ).first()

        if existing_course:
            raise HTTPException(
                status_code=400,
                detail="Course code already exists",
            )

        course.code = course_data.code
        course.name = course_data.name
        course.category = course_data.category
        course.level = course_data.level
        course.duration_hours = course_data.duration_hours
        course.status = course_data.status
        course.instructor = course_data.instructor
        course.short_description = course_data.short_description
        course.description = course_data.description

        db.commit()
        db.refresh(course)

        return course

    finally:
        db.close()


@app.delete(
    "/courses/{course_id}",
)
def delete_course(course_id: int):
    db = SessionLocal()

    try:
        course = db.get(
            Course,
            course_id,
        )

        if not course:
            raise HTTPException(
                status_code=404,
                detail="Course not found",
            )

        related_enrollments = db.scalars(
            select(Enrollment).where(
                Enrollment.course_id == course_id
            )
        ).all()

        for enrollment in related_enrollments:
            db.delete(enrollment)

        db.delete(course)
        db.commit()

        return {
            "message": "Course deleted"
        }

    finally:
        db.close()


@app.get(
    "/enrollments",
    response_model=list[EnrollmentResponse],
)
def get_enrollments():
    db = SessionLocal()

    try:
        return db.scalars(
            select(Enrollment)
        ).all()

    finally:
        db.close()


@app.post(
    "/enrollments",
    response_model=EnrollmentResponse,
)
def create_enrollment(
    enrollment: EnrollmentCreate,
):
    db = SessionLocal()

    try:
        existing = db.scalars(
            select(Enrollment).where(
                Enrollment.user_id
                == enrollment.user_id,
                Enrollment.course_id
                == enrollment.course_id,
            )
        ).first()

        if existing:
            return existing

        new_enrollment = Enrollment(
            user_id=enrollment.user_id,
            course_id=enrollment.course_id,
            status="Active",
        )

        db.add(new_enrollment)
        db.commit()
        db.refresh(new_enrollment)

        return new_enrollment

    finally:
        db.close()


@app.delete(
    "/enrollments/{user_id}/{course_id}",
)
def delete_enrollment(
    user_id: str,
    course_id: int,
):
    db = SessionLocal()

    try:
        enrollment = db.scalars(
            select(Enrollment).where(
                Enrollment.user_id == user_id,
                Enrollment.course_id == course_id,
            )
        ).first()

        if not enrollment:
            raise HTTPException(
                status_code=404,
                detail="Enrollment not found",
            )

        db.delete(enrollment)
        db.commit()

        return {
            "message": "Enrollment deleted"
        }

    finally:
        db.close()