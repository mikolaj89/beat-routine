# Droplet API deploy checklist

Use after **Init Droplet**, **Deploy test API**, and **Setup Caddy** workflows (recommended order: Init → Deploy → Caddy).

Replace `DROPLET_IP` with your Droplet IP (e.g. `46.101.174.67`).

---

## A. GitHub secrets (before CI)

- [ ] `DROPLET_HOST` = `DROPLET_IP` (no `http://`, no port)
- [ ] `DROPLET_USER` = `root`
- [ ] `DROPLET_SSH_KEY` = full private key from `~/.ssh/github_actions_deploy` (no passphrase)
- [ ] `REPO_CLONE_URL` = `https://github.com/mikolaj89/beat-routine.git`
- [ ] `DB_URL` = valid Postgres connection string
- [ ] `JWT_ACCESS_SECRET` = random string, 32+ characters
- [ ] Droplet `authorized_keys` includes `github_actions_deploy.pub`

---

## B. After Init Droplet workflow

SSH: `ssh root@DROPLET_IP`

- [ ] Docker installed: `docker --version`
- [ ] Docker works: `docker run --rm hello-world`
- [ ] Repo exists: `test -d /root/beat-routine/.git && echo OK`
- [ ] Latest commit visible: `cd /root/beat-routine && git log -1 --oneline`
- [ ] Deploy script present: `test -x /root/beat-routine-api-deploy/test/run-test-api-2.sh && echo OK`
---

## C. After Deploy test API workflow

On the Droplet:

- [ ] Image built: `docker images | grep drum-scheduler-api`
- [ ] Container running: `docker ps --filter name=drum-api`
- [ ] `test.env` exists: `test -f /root/beat-routine-api-deploy/test/test.env && echo OK`
- [ ] Health (local): `curl -sf http://localhost:8000/health`

From your laptop:

- [ ] Health (direct HTTP): `curl -sf http://DROPLET_IP:8000/health`

---

## D. After Setup Caddy workflow

SSH: `ssh root@DROPLET_IP`

- [ ] Caddy running: `systemctl is-active caddy`
- [ ] Caddyfile host: `grep sslip.io /etc/caddy/Caddyfile`
- [ ] Public URL file: `cat /root/beat-routine-api-deploy/test/public-api-url.txt`
- [ ] Health (HTTPS): `curl -sf https://DROPLET_IP.sslip.io/health`

Expected health response shape: JSON with `"ok": true` (may be wrapped in `{ "data": ... }`).

---

## E. If something fails

| Symptom | Check |
|--------|--------|
| CI `Permission denied (publickey)` | `DROPLET_SSH_KEY` matches `github_actions_deploy`; `.pub` on Droplet |
| CI passphrase / invalid key | Do not use `id_ed25519`; use deploy key without passphrase |
| `curl` connection refused | Container down: `docker logs drum-api` |
| `curl` timeout from laptop | DO firewall: allow TCP `8000`, `80`, `443` |
| HTTPS fails, HTTP works | Run Setup Caddy; API must be up on 8000 first |
| API exits on start | `docker logs drum-api` — often `DB_URL` or `JWT_ACCESS_SECRET` |

---

## F. Optional: manual deploy (without waiting for push)

On Droplet:

```bash
cd /root/beat-routine
git pull
docker build -f apps/api/Dockerfile -t drum-scheduler-api .
bash /root/beat-routine-api-deploy/test/run-test-api-2.sh
```

Requires `test.env` to exist (Deploy workflow creates it) or create it manually from `apps/api/test.env.template` plus secrets.
