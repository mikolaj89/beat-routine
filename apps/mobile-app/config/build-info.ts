import { ANDROID_BUILD_TIME_ISO } from "./build-info.generated";

/** UTC ISO-8601 timestamp from the last Android Gradle build (see `generateMobileBuildInfo`). */
export function getAndroidBuildTimeLabel(): string {
  return ANDROID_BUILD_TIME_ISO;
}
