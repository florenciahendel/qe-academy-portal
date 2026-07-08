from sqlalchemy import Column
from sqlalchemy import String

from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True)

    first_name = Column(String, nullable=False)

    last_name = Column(String, nullable=False)

    email = Column(String, unique=True, nullable=False)

    password = Column(String, nullable=False)

    role = Column(String, nullable=False)

    status = Column(String, nullable=False)