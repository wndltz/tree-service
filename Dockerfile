FROM node:10

COPY package.json /opt/actano/rplan/
COPY yarn.lock /opt/actano/rplan/
WORKDIR /opt/actano/rplan
RUN yarn install
COPY src /opt/actano/rplan/src
COPY auth.pub /opt/actano/rplan/
COPY babel.config.js /opt/actano/rplan/

ENTRYPOINT ["yarn", "run"]
CMD ["start"]
