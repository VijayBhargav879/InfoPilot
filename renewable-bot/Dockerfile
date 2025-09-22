FROM rasa/rasa-sdk:3.12.1

WORKDIR /app/actions

COPY actions/ /app/actions/

COPY .env /app/actions/.env

USER root
RUN pip install --no-cache-dir -r /app/actions/requirements.txt
USER 1001

ENTRYPOINT []
CMD ["python", "-m", "rasa_sdk", "--actions", "actions"]
