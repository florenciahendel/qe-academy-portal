from pydantic import BaseModel


class UserResponse(BaseModel):
    id: str
    first_name: str
    last_name: str
    email: str
    role: str
    status: str

    class Config:
        from_attributes = True


class CourseResponse(BaseModel):
    id: int
    code: str
    name: str
    category: str
    level: str
    duration_hours: int | None = None
    status: str | None = None
    instructor: str | None = None
    short_description: str | None = None
    description: str | None = None
    enrolled_students: int | None = None

    class Config:
        from_attributes = True


class EnrollmentResponse(BaseModel):
    id: int
    user_id: str
    course_id: int
    status: str

    class Config:
        from_attributes = True


class EnrollmentCreate(BaseModel):
    user_id: str
    course_id: int


class LoginRequest(BaseModel):
    email: str
    password: str
