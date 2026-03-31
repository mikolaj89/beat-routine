import { AudioBuffer } from 'react-native-audio-api';

export function isAccentBeat(beatNumber: number): boolean {
  return beatNumber === 1 || (beatNumber - 1) % 4 === 0;
}

export function getBeatGain(isAccented: boolean): number {
  return isAccented ? 0.6 : 0.3;
}

export function getBeatStartOffsetSec(isAccented: boolean): number {
  return isAccented ? 0.02 : 0;
}

type BeatBufferOptions = {
  clickBuffer: AudioBuffer | null;
  accentedClickBuffer: AudioBuffer | null;
  isAccented: boolean;
};

export function getBeatBuffer({
  clickBuffer,
  accentedClickBuffer,
  isAccented,
}: BeatBufferOptions): AudioBuffer | null {
  return isAccented ? accentedClickBuffer ?? clickBuffer : clickBuffer;
}

export function getIntervalSec(bpm: number): number {
  return 60 / bpm;
}

export function getInitialNextTimeSec(currentTime: number): number {
  return currentTime + 0.05;
}

export function getArrayBufferFromBinary(binary: string): ArrayBuffer {
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes.buffer;
}
