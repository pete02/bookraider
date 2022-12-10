FROM python:3
COPY ./python /python
WORKDIR /python
RUN pip install --no-cache-dir -r requirements.txt
RUN apt-get update
RUN apt-get -y install ffmpeg
EXPOSE 3333
CMD [ "python","./server.py" ]