dev:
	docker-compose -f deployment/docker-compose.dev.yml --project-directory . up 
build:
	docker-compose -f deployment/docker-compose.prod.yml --project-directory . up --build
deploy-image:
	docker-compose -f deployment/docker-compose.prod.yml --project-directory . build --no-cache
	docker-compose -f deployment/docker-compose.prod.yml --project-directory . push

