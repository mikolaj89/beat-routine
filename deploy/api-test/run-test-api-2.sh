#!/usr/bin/env bash
# Restarts the test API container on the Droplet.
# Expects test.env at /root/beat-routine-api-deploy/test/test.env (written by CI).
# Image must be built first: docker build -f apps/api/Dockerfile -t drum-scheduler-api .

set -euo pipefail

ENV_FILE="/root/beat-routine-api-deploy/test/test.env"
IMAGE_NAME="drum-scheduler-api"
CONTAINER_NAME="drum-api"
HOST_PORT=8000
CONTAINER_PORT=8000

if [[ ! -f "${ENV_FILE}" ]]; then
  echo "Missing ${ENV_FILE}. Create it or run the deploy workflow first." >&2
  exit 1
fi

docker rm -f "${CONTAINER_NAME}" 2>/dev/null || true

docker run -d \
  --name "${CONTAINER_NAME}" \
  --env-file "${ENV_FILE}" \
  -p "${HOST_PORT}:${CONTAINER_PORT}" \
  "${IMAGE_NAME}"

echo "Started ${CONTAINER_NAME} (${IMAGE_NAME}) on port ${HOST_PORT}"
docker ps --filter "name=${CONTAINER_NAME}"
