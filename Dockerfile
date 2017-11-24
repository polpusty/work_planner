FROM python:3
ENV PYTHONBUFFERED 1
RUN mkdir /code
WORKDIR /code
ADD ./planner /code/
RUN pip install -r requirments.txt
