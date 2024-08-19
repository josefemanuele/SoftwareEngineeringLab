from sqlalchemy import create_engine, select
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, Session

engine = create_engine('sqlite:///test.db', echo=True)

class Base(DeclarativeBase):
    pass

class Event(Base):
    __tablename__ = "Events"

    id: Mapped[int] = mapped_column(primary_key=True)
    # For now these are all nullable
    organization_id: Mapped[int | None]
    title: Mapped[str | None]
    description: Mapped[str | None]
    date: Mapped[str | None]
    start_time: Mapped[str | None]
    end_time: Mapped[str | None]
    price: Mapped[float | None]
    capacity: Mapped[int | None]

    def __repr__(self):
        return f"{{ id: {self.id}, title: {self.title} }}"

# Generating schemas in db
Base.metadata.create_all(engine) 

# DB functions for the whole collection
def create_event(**kwargs) -> int:

    required_fields = ["title", "organization_id"]

    for field in required_fields:
        if field not in kwargs:
            raise ValueError
        
    new_event = Event(title=kwargs["title"], 
                      organization_id=kwargs["organization_id"])
    
    with Session(engine) as session:
        session.add(new_event)
        session.commit()
        return new_event.id

def get_all_events():
    # This query should return a list of events.
    # Events should be represented by a dictionary

    with Session(engine) as session:
        query = select(Event)
        return_dict = {}
        for event in session.scalars(query):
            return_dict[event.id] = str(event)
        return return_dict

def get_all_events_by_organization_id(org_id: int):
    with Session(engine) as session:
        query = select(Event).where(Event.organization_id == org_id)
        return_dict = {}
        for event in session.scalars(query):
            return_dict[event.id] = str(event)
        return return_dict

# DB functions for a single element
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