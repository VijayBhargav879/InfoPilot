#!/bin/bash

# Start Action Server in the background
echo "Starting Action Server..."
rasa run actions --actions actions --port 5055 &

# Wait for Action Server to start (optional but good practice)
sleep 5

# Start Rasa Core (NLU) in the foreground
echo "Starting Rasa Server..."
# Railway provides the PORT environment variable.
rasa run --enable-api --cors "*" --port $PORT --endpoints endpoints.yml
