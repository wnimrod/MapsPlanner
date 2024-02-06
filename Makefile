dev:
	docker-compose -f deployment/docker-compose.dev.yml --project-directory . up 
build:
	docker-compose -f deployment/docker-compose.prod.yml --project-directory . up --build --force-recreate
