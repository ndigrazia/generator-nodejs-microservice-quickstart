# --------------> The build image__
FROM <%= buildImage %> AS build

RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

# --------------> The production image__
FROM <%= productionImage %>

ENV NODE_ENV production

COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init

WORKDIR /usr/src/app

COPY --chown=node:node . /usr/src/app

RUN npm ci --omit=dev

USER node

EXPOSE <%= port %>

# Define the command to run your app
CMD [ "dumb-init", "npm", "start" ]
