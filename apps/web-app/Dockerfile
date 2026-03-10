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
#   docker build -f apps/web-app/Dockerfile -t drum-scheduler-web .
COPY . .

# Install only the dependencies needed for the web-app (and its workspace deps).
RUN pnpm install --frozen-lockfile --filter web-app...

# Build the Next.js app
RUN pnpm --filter web-app build

# Expose the default Next.js port
EXPOSE 3000

# Start the Next.js server
CMD ["pnpm", "--filter", "web-app", "start"]
