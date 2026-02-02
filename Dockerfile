# Use Rasa Pro as base
FROM rasa/rasa-pro:3.12.17

# Switch to root to install dependencies and copy files
USER root

WORKDIR /app

# Copy the renewable-bot directory contents into /app
COPY renewable-bot /app
RUN chown -R 1001:1001 /app

# Upgrade pip and install action server requirements
RUN pip install --upgrade pip
RUN pip install -r actions/requirements.txt

# Make start script executable
RUN chmod +x start.sh

# Switch back to non-root user (important for Rasa images)
USER 1001

# Train the model during build (so it's ready for deployment)
# Note: This might fail if license is strictly required at build time.
# If it fails, we assume models are committed or trained separately.
# For this "fix", we try to train.
RUN rasa train

# Set Entrypoint to the start script
ENTRYPOINT []
CMD ["./start.sh"]
