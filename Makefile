.PHONY: down push pull lint test format build up

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
	docker exec cvbuilder-app uv run ruff check .

format:
	uv run ruff format .

venv-windows:
	.\.venv\Scripts\activate

venv-linux:
	source .venv/Scripts/activate

test:
	pytest

install-dev:
	docker exec cvbuilder-app uv pip install .[test,lint]

logs:
	docker logs -f cvbuilder-app
