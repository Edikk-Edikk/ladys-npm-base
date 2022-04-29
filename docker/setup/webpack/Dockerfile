FROM node:16.14.2

RUN apt update -y && apt dist-upgrade -y
RUN apt install -y git g++ make python nano openssh-client

USER node

RUN mkdir -p /home/node/.ssh && ln -s /run/secrets/github /home/node/.ssh/github
RUN chown -R node:node /home/node/.ssh
RUN echo "Host github.com\nHostName github.com\nUser git\nIdentityFile ~/.ssh/github\nStrictHostKeyChecking no\n" >> /home/node/.ssh/config

WORKDIR /app
