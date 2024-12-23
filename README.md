# Prenotalo: manage your appointments.
Project implemented with Infrastucture-As-A-Code paradigm, organizing team workflow with Scrum, 
building a mobile and web application intereacting with a distributed microservices Restful application.

## Authors:
Josef Emanuele Zerpa Ruiz, <zerparuiz.1837394@studenti.uniroma1.it>

Emanuele Roccia, <roccia.1967318@studenti.uniroma1.it>

Silvio D'Antonio, <dantonio.2145048@studenti.uniroma1.it>

Alessandro Cecchetto, <cecchetto.1941039@studenti.uniroma1.it>

Christian Perrella, <perrella.2081754@studenti.uniroma1.it>

## TODO:
- Add DB to all services.
- Add testing to all services.
- 

## Done:
- Write High-level Specification document.
- Submit High-level Specification document by 07/01.
- Define User Stories.
- Draw LowFi MockUps.
- Estimate effort in LOCs.
- Estimate cost with COCOMO2.
- Study software technologies.
- Understand how to build Rest infrstructure.
- Understand how to build backend.
- Understand how to build web and mobile frontend.

# HOWTO

## Deploy project
docker compose up -d

## Get a shell from "curl" service.
docker exec -it <container_name> sh

## List of services and endpoints.
| Service | Endpoint |
| --- | --- |
| event | http://10.234.0.3:5000 |
| organization | http://10.234.0.4:5000 |
| pay | http://10.234.0.5:5000 |
| reservations | http://10.234.0.6:5000 |
| user | http://10.234.0.7:5000 |

## Curl call to login.
curl -v <http://127.0.0.1:5000>/login -H "Content-Type: application/json" -d '{"email":"participant@prenotalo.com","password":"password"}'

## Curl call to check session.
curl -v http://127.0.0.1:5000/session/<session_id>

## Curl call to logout.
curl -v http://127.0.0.1:5000/logout/<session_id>

## Create and activate Python virtual environment.
python3 -m venv .venv

source .venv/bin/activate

## Install Python modules.
pip install -r requirements.txt

## Run tests with pytest, from the root of service.
pytest
