// Success response (for 2xx status codes)
export interface ApiSuccessResponse<T> {
  data: T;
}

// Error response (for 4xx, 5xx status codes)
export interface ApiErrorResponse {
  error: {
    message: string;
    errorCode: string;
    fieldErrors?: Record<string, string>;
  };
}

// These would never appear together in one response
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export class ApiClient {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor(baseUrl: string, defaultHeaders: Record<string, string> = {}) {
    this.baseUrl = baseUrl;
    this.headers = defaultHeaders;
  }

  setHeader(key: string, value: string) {
    this.headers[key] = value;
  }

  private async parseJsonSafe<T>(response: Response): Promise<T | null> {
    try {
      return (await response.json()) as T;
    } catch (error) {
      console.warn("Unable to parse JSON response:", error);
      return null;
    }
  }

  async request<T>(
    endpoint: string,
    method: string,
    body?: unknown,
    customHeaders: Record<string, string> = {},
  ): Promise<ApiResponse<T | null>> {
    try {
      const mergedHeaders: Record<string, string> = {
        ...this.headers,
        ...customHeaders,
      };
      const hasBody = body !== undefined;
      const hasExplicitContentType = Object.keys(mergedHeaders).some(
        (key) => key.toLowerCase() === "content-type",
      );

      if (hasBody && !hasExplicitContentType) {
        mergedHeaders["Content-Type"] = "application/json";
      }

      if (!hasBody) {
        for (const key of Object.keys(mergedHeaders)) {
          if (key.toLowerCase() === "content-type") {
            delete mergedHeaders[key];
          }
        }
      }

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method,
        headers: mergedHeaders,
        body: hasBody ? JSON.stringify(body) : undefined,
        credentials: "include",
      });

      const responseData = await this.parseJsonSafe<unknown>(response);

      if (!responseData && !response.ok) {
        return {
          error: {
            message:
              "Request failed, AND response is not JSON. Check server logs or network tab.",
            errorCode: "PARSE_ERROR",
          },
        };
      }

      if (!responseData) {
        // If the response is empty but the request was successful, return null data
        // This is a common case for DELETE requests or endpoints that return no content.
        return { data: null };
      }

      if (response.ok) {
        if (
          responseData !== null &&
          typeof responseData === "object" &&
          ("data" in responseData || "error" in responseData)
        ) {
          return responseData as ApiResponse<T | null>;
        }

        return { data: responseData as T };
      }

      return responseData as ApiResponse<T | null>;
    } catch (error) {
      return {
        error: {
          message: error instanceof Error ? error.message : "Network error",
          errorCode: "NETWORK_ERROR",
        },
      };
    }
  }

  get<T>(
    endpoint: string,
    headers: Record<string, string> = {},
  ): Promise<ApiResponse<T | null>> {
    return this.request<T>(endpoint, "GET", undefined, headers);
  }

  post<T>(
    endpoint: string,
    body?: unknown,
    headers: Record<string, string> = {},
  ): Promise<ApiResponse<T | null>> {
    return this.request<T>(endpoint, "POST", body, headers);
  }

  put<T>(
    endpoint: string,
    body: any,
    headers: Record<string, string> = {},
  ): Promise<ApiResponse<T | null>> {
    return this.request<T>(endpoint, "PUT", body, headers);
  }

  patch<T>(
    endpoint: string,
    body: any,
    headers: Record<string, string> = {},
  ): Promise<ApiResponse<T | null>> {
    return this.request<T>(endpoint, "PATCH", body, headers);
  }

  delete<T>(
    endpoint: string,
    headers: Record<string, string> = {},
  ): Promise<ApiResponse<T | null>> {
    return this.request<T>(endpoint, "DELETE", undefined, headers);
  }
}
