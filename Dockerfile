FROM python:3.13-slim

WORKDIR /work/

RUN pip install uv
COPY ./pyproject.toml /work/pyproject.toml
COPY ./uv.lock /work/uv.lock
RUN uv sync

ENV PYTHONPATH=/work/src:$PYTHONPATH

COPY . /work/

CMD ["uv", "run", "--env-file", ".env", "python", "-u", "main.py"]
