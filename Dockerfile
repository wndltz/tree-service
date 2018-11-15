FROM node:10

COPY . /opt/actano/rplan
WORKDIR /opt/actano/rplan
RUN yarn install

ENTRYPOINT ["yarn", "run"]
CMD ["start"]
