#!/bin/sh

# Wait until MongoDB is ready
until nc -z -v -w30 mongodb 27017
do
  echo "Waiting for MongoDB connection..."
  sleep 5
done

echo "MongoDB is up - executing command"
shift  # Remove the MongoDB URI from the argument list
exec "$@"
