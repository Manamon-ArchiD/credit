FROM mongo:6-jammy

WORKDIR /docker-entrypoint-initdb.d

COPY . .

RUN apt-get update          && \
    apt-get install -y npm  && \
    npm install
