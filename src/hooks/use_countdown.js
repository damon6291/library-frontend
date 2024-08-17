import { useState, useEffect, useCallback } from 'react';

// ----------------------------------------------------------------------

export function useCountdownDate(date) {
  const [countdown, setCountdown] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    const interval = setInterval(() => setNewTime(), 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setNewTime = () => {
    const startTime = date;

    const endTime = new Date();

    const distanceToNow = startTime.valueOf() - endTime.valueOf();

    const getDays = Math.floor(distanceToNow / (1000 * 60 * 60 * 24));

    const getHours = `0${Math.floor(
      (distanceToNow % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    )}`.slice(-2);

    const getMinutes = `0${Math.floor((distanceToNow % (1000 * 60 * 60)) / (1000 * 60))}`.slice(-2);

    const getSeconds = `0${Math.floor((distanceToNow % (1000 * 60)) / 1000)}`.slice(-2);

    setCountdown({
      days: getDays.toString() || '000',
      hours: getHours || '000',
      minutes: getMinutes || '000',
      seconds: getSeconds || '000',
    });
  };

  return {
    days: countdown.days,
    hours: countdown.hours,
    minutes: countdown.minutes,
    seconds: countdown.seconds,
  };
}

// Usage
// const countdown = useCountdown(new Date('07/07/2022 21:30'));

// ----------------------------------------------------------------------

export function useCountdownSeconds(initCountdown) {
  const [countdown, setCountdown] = useState(initCountdown);
  const [intervalId, setIntervalId] = useState();
  const stopCountdown = useCallback(() => {
    clearInterval(intervalId);
    setIntervalId(null);
    setCountdown(initCountdown);
  }, [intervalId, initCountdown]);
  const startCountdown = useCallback(() => {
    let remainingSeconds = initCountdown;

    const localIntervalId = setInterval(() => {
      remainingSeconds -= 1;

      if (remainingSeconds === 0) {
        clearInterval(localIntervalId);
        setIntervalId(null);
        setCountdown(0);
      } else {
        setCountdown(remainingSeconds);
      }
    }, 1000);
    setIntervalId(localIntervalId);
  }, [initCountdown]);

  const counting = initCountdown > countdown;

  return { counting, countdown, setCountdown, startCountdown, stopCountdown };
}
