import crashlytics from '@react-native-firebase/crashlytics';
import { Platform } from 'react-native';

let isCrashlyticsFetchLoggingInstalled = false;

type FetchInput = Parameters<typeof fetch>[0];

function resolveRequestUrl(input: FetchInput): string {
  if (typeof input === 'string') {
    return input;
  }

  if (typeof Request !== 'undefined' && input instanceof Request) {
    return input.url;
  }

  return 'unknown-url';
}

function resolveRequestMethod(input: FetchInput, init?: RequestInit): string {
  if (typeof init?.method === 'string' && init.method.length > 0) {
    return init.method.toUpperCase();
  }

  if (typeof Request !== 'undefined' && input instanceof Request) {
    return input.method.toUpperCase();
  }

  return 'GET';
}

export function installCrashlyticsNetworkFailureLogging(): void {
  if (Platform.OS !== 'android' || isCrashlyticsFetchLoggingInstalled) {
    return;
  }

  const originalFetch = globalThis.fetch.bind(globalThis);

  globalThis.fetch = async (
    input: FetchInput,
    init?: RequestInit,
  ): Promise<Response> => {
    const method = resolveRequestMethod(input, init);
    const url = resolveRequestUrl(input);

    try {
      const response = await originalFetch(input, init);

      if (!response.ok) {
        crashlytics().recordError(
          new Error(`HTTP ${response.status} ${method} ${url}`),
        );
      }

      return response;
    } catch (error) {
      const normalizedError =
        error instanceof Error ? error : new Error(String(error));

      crashlytics().recordError(
        new Error(`NETWORK ${method} ${url}: ${normalizedError.message}`),
      );

      throw error;
    }
  };

  isCrashlyticsFetchLoggingInstalled = true;
}
