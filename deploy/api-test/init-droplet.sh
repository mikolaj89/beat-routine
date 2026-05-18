#!/usr/bin/env bash
# One-time Droplet bootstrap for test API deployments.
#
# Run on a fresh Ubuntu Droplet (as root), e.g.:
#   REPO_URL=https://github.com/<user>/<repo>.git bash init-droplet.sh
#
# Or via GitHub Actions workflow "Init Droplet" (workflow_dispatch).

set -euo pipefail

REPO_URL="${REPO_URL:-}"
REPO_DIR="${REPO_DIR:-/root/beat-routine}"
DEPLOY_DIR="${DEPLOY_DIR:-/root/beat-routine-api-deploy/test}"
DEPLOY_SSH_PUBLIC_KEY="${DEPLOY_SSH_PUBLIC_KEY:-}"
GITHUB_BRANCH="${GITHUB_BRANCH:-main}"

if [[ "${EUID}" -ne 0 ]]; then
  echo "Run as root (e.g. sudo bash init-droplet.sh)" >&2
  exit 1
fi

if [[ -z "${REPO_URL}" ]]; then
  echo "REPO_URL is required (HTTPS or SSH clone URL)." >&2
  echo "Example: REPO_URL=https://github.com/you/drum-scheduler-web.git bash init-droplet.sh" >&2
  exit 1
fi

echo "==> Installing packages (git, curl, ca-certificates)..."
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq git curl ca-certificates gnupg

if ! command -v docker >/dev/null 2>&1; then
  echo "==> Installing Docker..."
  install -m 0755 -d /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
  chmod a+r /etc/apt/keyrings/docker.gpg
  echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
    https://download.docker.com/linux/ubuntu \
    $(. /etc/os-release && echo "${VERSION_CODENAME}") stable" \
    > /etc/apt/sources.list.d/docker.list
  apt-get update -qq
  apt-get install -y -qq docker-ce docker-ce-cli containerd.io
  systemctl enable --now docker
else
  echo "==> Docker already installed, skipping."
fi

echo "==> Creating deploy directories..."
mkdir -p "${DEPLOY_DIR}"

if [[ -n "${DEPLOY_SSH_PUBLIC_KEY}" ]]; then
  echo "==> Ensuring GitHub Actions deploy key is in authorized_keys..."
  mkdir -p /root/.ssh
  chmod 700 /root/.ssh
  touch /root/.ssh/authorized_keys
  chmod 600 /root/.ssh/authorized_keys
  if ! grep -qF "${DEPLOY_SSH_PUBLIC_KEY}" /root/.ssh/authorized_keys; then
    echo "${DEPLOY_SSH_PUBLIC_KEY}" >> /root/.ssh/authorized_keys
    echo "Added deploy public key."
  else
    echo "Deploy public key already present."
  fi
fi

if [[ -d "${REPO_DIR}/.git" ]]; then
  echo "==> Repo already exists at ${REPO_DIR}, fetching latest..."
  cd "${REPO_DIR}"
  git fetch --prune origin
  git checkout "${GITHUB_BRANCH}"
  git reset --hard "origin/${GITHUB_BRANCH}"
else
  echo "==> Cloning repo into ${REPO_DIR}..."
  git clone --branch "${GITHUB_BRANCH}" "${REPO_URL}" "${REPO_DIR}"
  cd "${REPO_DIR}"
fi

cp deploy/api-test/run-test-api-2.sh "${DEPLOY_DIR}/"
chmod +x "${DEPLOY_DIR}/run-test-api-2.sh"

echo ""
echo "Bootstrap complete."
echo "  Repo:        ${REPO_DIR}"
echo "  Deploy dir:  ${DEPLOY_DIR}"
echo "  Docker:      $(docker --version)"
echo ""
echo "Next steps:"
echo "  1. Run 'Deploy test API' workflow (or push to main)"
echo "  2. Run 'Setup Caddy (HTTPS)' workflow for https://<ip>.sslip.io"
echo "  3. Open http://<droplet-ip>:8000/health (or HTTPS URL after Caddy)"
