#!/bin/bash

docker run -d --rm --name gf-assign-unittest-postgres --pull always -e POSTGRES_USER=test -e POSTGRES_PASSWORD=test -e POSTGRES_DB=test -p 5432:5432 postgres:14.5
