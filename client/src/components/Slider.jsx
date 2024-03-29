import { useState, useEffect } from 'react';

export default function Slider({
  duration,
  currentTime,
  onChange,
  percentage
}) {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    setPosition(percentage);
  }, [percentage]);

  return (
    <div className="w-50">
      <input
        type="range"
        value={!position ? 0 : position}
        step="0.01"
        className="form-range"
        onChange={onChange}></input>
      <SongTimes currentTime={currentTime} duration={duration} />
    </div>
  );
}

const SongTimes = ({ currentTime, duration }) => {
  const secondsToHms = seconds => {
    if (!seconds) return '00:00';
    const min = Math.floor(seconds / 60);
    const secs = (seconds - min * 60).toFixed(0);
    const minutes = min < 10 ? `0${min}` : min;
    const segundos = secs < 10 ? `0${secs}` : secs;

    return `${minutes}:${segundos}`;
  };

  return (
    <div className="d-flex justify-content-between">
      <div className="timer">{secondsToHms(currentTime)}</div>
      <div className="timer">{secondsToHms(duration)}</div>
    </div>
  );
};
