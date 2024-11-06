# SoftwareEngineeringLab
Project to practice the methodologies studied in the Software Engineering course.

## TODO:
- Add DB to all services.
- Add testing to all services.
- 

## DONE:
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

## Create and activate Python virtual environment.
python3 -m venv .venv

source .venv/bin/activate

## Install Python modules.
pip install -r requirements.txt

## Run tests with pytest, from the root of service.
pytest
