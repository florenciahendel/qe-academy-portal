from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from app.database import Base


class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True)

    code = Column(String, nullable=False)

    name = Column(String, nullable=False)

    category = Column(String, nullable=False)

    level = Column(String, nullable=False)

    duration_hours = Column(Integer)

    status = Column(String)

    instructor = Column(String)

    short_description = Column(String)

    description = Column(String)

    enrolled_students = Column(Integer)