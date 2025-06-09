#!/bin/sh
set -e

# Function to check if database is ready
wait_for_db() {
  echo "Waiting for database to be ready..."
  while ! nc -z $DB_HOST $DB_PORT; do
    sleep 1
  done
  echo "Database is ready!"
}

# Wait for database to be ready
wait_for_db

# Run database initialization
echo "Initializing database..."
npm run init-db

# Start the application
echo "Starting application..."
exec "$@" 