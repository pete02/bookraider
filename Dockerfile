FROM node:latest
COPY . /
RUN mkdir /mp3
RUN npm install
RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install -y ffmpeg
EXPOSE 3001
CMD ["node", "/index.js"]