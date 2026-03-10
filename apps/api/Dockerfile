FROM node:22-alpine

# Use a consistent working directory inside the container
WORKDIR /app

# Enable corepack so pnpm is available
ENV NODE_ENV=production
# Ensure pnpm runs non-interactively (no TTY) inside Docker
ENV CI=true
RUN corepack enable

# Copy the entire monorepo into the image.
# Build context should be the repo root, e.g.:
#   docker build -f apps/api/Dockerfile -t drum-scheduler-api .
COPY . .

# Install only the dependencies needed for the API (and its workspace deps).
# We keep devDependencies because the API runs via `tsx src/server.ts`.
RUN pnpm install --frozen-lockfile --filter @drum-scheduler/api...

# Expose the default API port; override with PORT env var if needed.
EXPOSE 8000

# By default, bind to all interfaces inside the container.
ENV HOST=0.0.0.0

# Start the API using the workspace script.
CMD ["pnpm", "--filter", "@drum-scheduler/api", "start"]

