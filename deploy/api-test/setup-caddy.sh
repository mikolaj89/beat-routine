#!/usr/bin/env bash
# Install Caddy and reverse-proxy HTTPS -> API on localhost:8000.
#
# Run on the Droplet (as root), e.g.:
#   DROPLET_IP=46.101.174.67 bash setup-caddy.sh
#
# Or via GitHub Actions workflow "Setup Caddy" (workflow_dispatch).

set -euo pipefail

DEPLOY_DIR="${DEPLOY_DIR:-/root/beat-routine-api-deploy/test}"
DROPLET_IP="${DROPLET_IP:-}"
CADDY_DOMAIN="${CADDY_DOMAIN:-}"
API_UPSTREAM="${API_UPSTREAM:-localhost:8000}"

if [[ "${EUID}" -ne 0 ]]; then
  echo "Run as root (e.g. sudo bash setup-caddy.sh)" >&2
  exit 1
fi

if [[ -z "${CADDY_DOMAIN}" && -n "${DROPLET_IP}" ]]; then
  CADDY_DOMAIN="${DROPLET_IP}.sslip.io"
fi

if [[ -z "${CADDY_DOMAIN}" ]]; then
  echo "Set DROPLET_IP or CADDY_DOMAIN (e.g. CADDY_DOMAIN=46.101.174.67.sslip.io)" >&2
  exit 1
fi

export DEBIAN_FRONTEND=noninteractive
mkdir -p "${DEPLOY_DIR}"

echo "==> Installing Caddy..."
if ! command -v caddy >/dev/null 2>&1; then
  apt-get update -qq
  apt-get install -y -qq debian-keyring debian-archive-keyring apt-transport-https curl gnupg
  curl -1sLf "https://dl.cloudsmith.io/public/caddy/stable/gpg.key" \
    | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
  curl -1sLf "https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt" \
    | tee /etc/apt/sources.list.d/caddy-stable.list
  apt-get update -qq
  apt-get install -y -qq caddy
else
  echo "==> Caddy already installed, skipping package install."
fi

echo "==> Configuring Caddy: https://${CADDY_DOMAIN} -> http://${API_UPSTREAM}"
cat > /etc/caddy/Caddyfile <<EOF
${CADDY_DOMAIN} {
	reverse_proxy ${API_UPSTREAM}
}
EOF

systemctl enable caddy
systemctl reload caddy 2>/dev/null || systemctl restart caddy

if command -v ufw >/dev/null 2>&1 && ufw status 2>/dev/null | grep -q "Status: active"; then
  ufw allow 80/tcp
  ufw allow 443/tcp
fi

echo "https://${CADDY_DOMAIN}" > "${DEPLOY_DIR}/public-api-url.txt"

echo ""
echo "Caddy setup complete."
echo "  Domain:      ${CADDY_DOMAIN}"
echo "  Upstream:    ${API_UPSTREAM}"
echo "  Public API:  https://${CADDY_DOMAIN}"
echo "  Health:      https://${CADDY_DOMAIN}/health"
echo ""
echo "Ensure the API container is running on port 8000 before testing."
