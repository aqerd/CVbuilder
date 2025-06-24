all: build up

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

pull:
	docker-compose pull

push:
	docker push cvbuilder

lint:
	echo "lint will be added soon"

format:
	echo "format will be added soon"

test:
	echo "test will be added soon"
