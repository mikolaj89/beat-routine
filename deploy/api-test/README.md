# API test deployment (DigitalOcean Droplet)

See **[CHECKLIST.md](./CHECKLIST.md)** for step-by-step verification after init and deploy.

## Scripts

| Script | When to run |
|--------|-------------|
| `init-droplet.sh` | **Once** on a new Droplet (install Docker, clone repo, deploy dirs) |
| `run-test-api-2.sh` | **Every deploy** (restart `drum-api` container; `test.env` written by CI) |

## One-time setup

### Option A: GitHub Actions (recommended)

1. Add secrets:
   - `DROPLET_HOST` — Droplet IP (e.g. `46.101.174.67`)
   - `DROPLET_USER` — usually `root`
   - `DROPLET_SSH_KEY` — full **private** key for CI (no passphrase). Do not use your daily laptop key if it asks for a password.

     ```bash
     # Deploy-only key (no passphrase)
     ssh-keygen -t ed25519 -f ~/.ssh/beat_routine_deploy -N "" -C "github-actions-deploy"
     cat ~/.ssh/beat_routine_deploy.pub   # append to /root/.ssh/authorized_keys on the Droplet
     cat ~/.ssh/beat_routine_deploy       # paste into GitHub secret DROPLET_SSH_KEY
     ```

     You can keep using your personal key for `ssh root@<ip>` from your laptop; CI uses `beat_routine_deploy` only.
   - `DEPLOY_SSH_PUBLIC_KEY` — matching **public** key (one line, for `authorized_keys`)
   - `REPO_CLONE_URL` — e.g. `https://github.com/<you>/<repo>.git` (use a PAT in URL if private)
   - `DB_URL`, `JWT_ACCESS_SECRET` — for deploy workflow

2. Ensure the Droplet allows SSH with your key (DO console or add `DEPLOY_SSH_PUBLIC_KEY` manually once).

3. Run workflow **Init Droplet (one-time)** in GitHub Actions.

4. On every push to `main`, **Deploy test API** runs automatically.

### Option B: Manual on the Droplet

```bash
curl -fsSL https://raw.githubusercontent.com/<you>/<repo>/main/deploy/api-test/init-droplet.sh -o /tmp/init-droplet.sh
REPO_URL=https://github.com/<you>/<repo>.git bash /tmp/init-droplet.sh
```

## Layout on the Droplet

```text
/root/
├── beat-routine/                 # git clone (app repo)
└── beat-routine-api-deploy/
    └── test/
        ├── test.env              # written by CI each deploy
        └── run-test-api-2.sh     # copied from repo
```
