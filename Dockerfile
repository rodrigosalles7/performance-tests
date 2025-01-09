FROM cypress/browsers:node14.17.6-slim-chrome100-ff99-edge

# avoid too many progress messages
# https://github.com/cypress-io/cypress/issues/1243
ENV CI=1

# disable shared memory X11 affecting Cypress v4 and Chrome
# https://github.com/cypress-io/cypress-docker-images/issues/270
ENV QT_X11_NO_MITSHM=1
ENV _X11_NO_MITSHM=1
ENV _MITSHM=0

# copy project to /app and workdir
COPY . /app
WORKDIR /app

#install npm depedencies
RUN npm install --no-save
RUN npm audit || true
RUN apt-get install unzip

CMD