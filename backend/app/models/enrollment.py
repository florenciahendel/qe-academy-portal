from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from app.database import Base


class Enrollment(Base):
    __tablename__ = "enrollments"

    id = Column(Integer, primary_key=True)

    user_id = Column(String, nullable=False)

    course_id = Column(Integer, nullable=False)

    status = Column(String, nullable=False)