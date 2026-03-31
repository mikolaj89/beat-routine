import { useEffect, useRef } from 'react';
import { AudioBuffer, AudioContext } from 'react-native-audio-api';
import RNFS from 'react-native-fs';
import { MetronomeOptions } from './use-metronome.constants';
import {
  getArrayBufferFromBinary,
  getBeatBuffer,
  getBeatGain,
  getInitialNextTimeSec,
  getIntervalSec,
  getBeatStartOffsetSec,
  isAccentBeat,
} from './use-metronome.helper';

declare const atob: (input: string) => string;

type SchedulerConfig = {
  intervalSec: number;
  lookaheadMs: number;
  scheduleAheadSec: number;
};

export const useMetronome = (options: MetronomeOptions) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const clickBufferRef = useRef<AudioBuffer | null>(null);
  const accentedClickBufferRef = useRef<AudioBuffer | null>(null);
  const beatNumberRef = useRef<number>(1);
  const runningRef = useRef<boolean>(false);
  const nextTimeRef = useRef<number>(0);
  const schedulerTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const stop = () => {
    runningRef.current = false;
    beatNumberRef.current = 1;
    if (schedulerTimeoutRef.current) {
      clearTimeout(schedulerTimeoutRef.current);
      schedulerTimeoutRef.current = null;
    }
  };

  const readClickTrackAsset = async (assetPath: string) => {
    const base64 = await RNFS.readFileAssets(assetPath, 'base64');
    return getArrayBufferFromBinary(atob(base64));
  };

  const tick = (time: number, isAccented: boolean) => {
    const audioContext = audioContextRef.current;
    const clickBuffer = getBeatBuffer({
      clickBuffer: clickBufferRef.current,
      accentedClickBuffer: accentedClickBufferRef.current,
      isAccented,
    });
    if (!audioContext || !clickBuffer) return;

    const src = audioContext.createBufferSource();
    src.buffer = clickBuffer;
    const gain = audioContext.createGain();
    gain.gain.setValueAtTime(getBeatGain(isAccented), time);

    src.connect(gain);
    gain.connect(audioContext.destination);

    src.start(time, getBeatStartOffsetSec(isAccented));
  };

  const scheduler = (config: SchedulerConfig) => {
    const audioContext = audioContextRef.current;
    const isRunning = runningRef.current;
    if (!isRunning || !audioContext) return;

    const { intervalSec, lookaheadMs, scheduleAheadSec } = config;

    const now = audioContext.currentTime;
    let nextTime = nextTimeRef.current;
    let beatNumber = beatNumberRef.current;
    while (nextTime < now + scheduleAheadSec) {
      tick(nextTime, isAccentBeat(beatNumber));
      nextTime += intervalSec;
      beatNumber += 1;
    }

    beatNumberRef.current = beatNumber;
    nextTimeRef.current = nextTime;
    schedulerTimeoutRef.current = setTimeout(
      () => scheduler(config),
      lookaheadMs,
    );
  };

  const play = async (beatsPerMinute?: number) => {
    stop();
    let {
      bpm,
      clickAssetPath,
      accentedClickAssetPath,
      lookaheadMs,
      scheduleAheadSec,
    } = options;
    bpm = beatsPerMinute ?? bpm;
    const intervalSec = getIntervalSec(bpm);

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    const audioContext = audioContextRef.current;

    if (!clickBufferRef.current) {
      const arrayBuffer = await readClickTrackAsset(clickAssetPath);
      clickBufferRef.current = await audioContext.decodeAudioData(arrayBuffer);
    }
    if (!accentedClickBufferRef.current) {
      const arrayBuffer = await readClickTrackAsset(accentedClickAssetPath);
      accentedClickBufferRef.current =
        await audioContext.decodeAudioData(arrayBuffer);
    }

    nextTimeRef.current = getInitialNextTimeSec(audioContext.currentTime);
    beatNumberRef.current = 1;
    runningRef.current = true;

    scheduler({
      intervalSec,
      lookaheadMs,
      scheduleAheadSec,
    });
  };

  useEffect(() => {
    return () => {
      stop();
    };
  }, []);

  return { play, stop };
};
