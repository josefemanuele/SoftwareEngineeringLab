from sqlalchemy import create_engine, select
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, Session

engine = create_engine('sqlite:///test.db', echo=True)

class Base(DeclarativeBase):
    pass

class Event(Base):
    __tablename__ = "Events"

    id: Mapped[int] = mapped_column(primary_key=True)
    # For now title is nullable
    title: Mapped[str | None]

    def update_all(title: str):
        self.title = title

    def __repr__(self):
        return f"Event(id={self.id}, title={self.title})"

# Generating schemas in db
Base.metadata.create_all(engine) 

# Probably some of these functions can be moved inside the Event class
# for ease of use
def create_event(title: str) -> int:
    with Session(engine) as session:
        new_event = Event(title=title)
        session.add(new_event)
        session.commit()
        return new_event.id

def get_all_events():
    with Session(engine) as session:
        query = select(Event)
        return session.scalars(query)

def get_event_by_id(id: int):
    with Session(engine) as session:
        query = select(Event).where(Event.id == id)
        return session.scalars(query)

def update_event(id: int, title):
    with Session(engine) as session:
        query = select(Event).where(Event.id == id)
        event = session.scalar(query).one()
        event.update_all(title)
        session.commit()

def delete_event(id: int):
    with Session(engine) as session:
        query = select(Event).where(Event.id == id)
        event = session.scalar(query).one()
        session.delete(event)
        session.commit()