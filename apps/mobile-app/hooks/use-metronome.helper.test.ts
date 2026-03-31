import {
  getArrayBufferFromBinary,
  getBeatBuffer,
  getBeatGain,
  getBeatStartOffsetSec,
  getInitialNextTimeSec,
  getIntervalSec,
  isAccentBeat,
} from './use-metronome.helper';
import { AudioBuffer } from 'react-native-audio-api';

describe('isAccentBeat', () => {
  it('returns true for the first beat', () => {
    expect(isAccentBeat(1)).toBe(true);
  });

  it('returns true for every fourth beat after the first', () => {
    expect(isAccentBeat(5)).toBe(true);
    expect(isAccentBeat(9)).toBe(true);
    expect(isAccentBeat(13)).toBe(true);
  });

  it('returns false for non-accent beats', () => {
    expect(isAccentBeat(2)).toBe(false);
    expect(isAccentBeat(4)).toBe(false);
    expect(isAccentBeat(10)).toBe(false);
  });
});

describe('getBeatGain', () => {
  it('uses a lower base volume for regular beats', () => {
    expect(getBeatGain(false)).toBe(0.3);
  });

  it('keeps accented beats slightly louder', () => {
    expect(getBeatGain(true)).toBe(0.6);
  });
});

describe('getBeatStartOffsetSec', () => {
  it('does not offset regular beats', () => {
    expect(getBeatStartOffsetSec(false)).toBe(0);
  });

  it('trims a small leading slice from accented beats', () => {
    expect(getBeatStartOffsetSec(true)).toBe(0.02);
  });
});

describe('getBeatBuffer', () => {
  const clickBuffer = { id: 'click' } as unknown as AudioBuffer;
  const accentedClickBuffer = { id: 'accent' } as unknown as AudioBuffer;

  it('uses the regular click buffer for non-accented beats', () => {
    expect(
      getBeatBuffer({
        clickBuffer,
        accentedClickBuffer,
        isAccented: false,
      }),
    ).toBe(clickBuffer);
  });

  it('uses the accent buffer for accented beats', () => {
    expect(
      getBeatBuffer({
        clickBuffer,
        accentedClickBuffer,
        isAccented: true,
      }),
    ).toBe(accentedClickBuffer);
  });

  it('falls back to the regular click buffer when accent buffer is missing', () => {
    expect(
      getBeatBuffer({
        clickBuffer,
        accentedClickBuffer: null,
        isAccented: true,
      }),
    ).toBe(clickBuffer);
  });
});

describe('getIntervalSec', () => {
  it('converts bpm to seconds per beat', () => {
    expect(getIntervalSec(120)).toBe(0.5);
  });
});

describe('getInitialNextTimeSec', () => {
  it('adds a small scheduling delay before the first beat', () => {
    expect(getInitialNextTimeSec(1)).toBe(1.05);
  });
});

describe('getArrayBufferFromBinary', () => {
  it('converts a binary string into an array buffer', () => {
    const result = getArrayBufferFromBinary('ABC');

    expect(Array.from(new Uint8Array(result))).toEqual([65, 66, 67]);
  });
});
