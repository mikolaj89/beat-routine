# Mobile App

React Native mobile app for Drum Scheduler.

## Prerequisites

Make sure your machine is set up for React Native development before running the app:

- [React Native environment setup](https://reactnative.dev/docs/set-up-your-environment)
- Node.js `>=20`

For iOS, install CocoaPods after native dependency changes:

```sh
bundle install
bundle exec pod install
```

## Running the App

Start Metro:

```sh
npm run start
```

Run Android:

```sh
npm run android
```

Run iOS:

```sh
npm run ios
```

Other useful commands:

```sh
npm run lint
npm run test
npm run typecheck
```

## Environment Config

The mobile app reads its config from JSON files in `apps/mobile-app`.

Tracked template:

- `env.example.json`

Local override, ignored by git:

- `env.json`

Selected environment, ignored by git:

- `env.active.json`

The active config is resolved like this:

1. `env.example.json` provides the base config shape.
2. `env.json` overrides any local values.
3. `env.active.json` chooses which environment from `envs` is active.
4. `config/env.ts` validates the result with `zod` and exports the resolved values.

### `env.example.json`

This file defines the available environment names and their values:

```json
{
  "envs": {
    "local": {
      "API_BASE_URL": "http://10.0.2.2:8000"
    },
    "test": {
      "API_BASE_URL": "http://10.0.2.2:8001"
    }
  }
}
```

### `env.json`

Create a local `env.json` if you want to override the example values on your machine:

```json
{
  "envs": {
    "local": {
      "API_BASE_URL": "http://192.168.0.249:8000"
    },
    "test": {
      "API_BASE_URL": "http://167.71.34.89:8000"
    }
  }
}
```

You only need to include the values you want to override.

### `env.active.json`

This file picks which entry from `envs` is active:

```json
{
  "active_env_name": "local"
}
```

Switch to the test backend by changing it to:

```json
{
  "active_env_name": "test"
}
```

If `env.active.json` is missing, the app falls back to `local`.

## Notes

- `API_BASE_URL` is currently exported from `config/env.ts`
- `config/env.ts` also exports `activeEnvConfig`, which is useful if you add more per-environment fields later.
- After changing `env.active.json` or `env.json`, restart Metro or reload the app to ensure the new config is picked up.

## Localhost Tips

- Android emulator cannot use your machine's `localhost` directly. Use `http://10.0.2.2:<port>`.
- iOS simulator can usually use `http://127.0.0.1:<port>` or `http://localhost:<port>`.
- A physical device should use your computer's LAN IP, for example `http://192.168.x.x:<port>`.
