import { renderHook, act } from '@testing-library/react-native';
import { useTimer } from './use-time-countdown';

describe('useTimer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('starts from initial seconds', () => {
    const { result } = renderHook(() => useTimer(5));
    expect(result.current.secondsLeft).toBe(5);
  });

  it('counts down when started', () => {
    const { result } = renderHook(() => useTimer(3));

    act(() => {
      result.current.startCountdown();
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.secondsLeft).toBe(2);

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.secondsLeft).toBe(1);

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.secondsLeft).toBe(0);
  });

  it('stops counting down when stopped', () => {
    const { result } = renderHook(() => useTimer(5));

    act(() => {
      result.current.startCountdown();
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.secondsLeft).toBe(4);

    act(() => {
      result.current.stopCountdown();
      jest.advanceTimersByTime(2000);
    });

    expect(result.current.secondsLeft).toBe(4);
  });

  it('resets to a new value', () => {
    const { result } = renderHook(() => useTimer(5));

    act(() => {
      result.current.startCountdown();
    });

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(result.current.secondsLeft).toBe(3);

    act(() => {
      result.current.resetCountdown(10);
    });
    expect(result.current.secondsLeft).toBe(10);
  });
});
