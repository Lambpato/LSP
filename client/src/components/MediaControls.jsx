import { useState, useRef, useEffect, useCallback } from 'react';
import {
  SkipBackwardFill,
  PlayCircleFill,
  PauseCircleFill,
  SkipForwardFill
} from 'react-bootstrap-icons';
import Slider from './Slider';

export default function MediaControls({ song, index, displaySong, songs }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [currentSong, setCurrentSong] = useState('');

  const audioRef = useRef();

  const onChange = e => {
    const audio = audioRef.current;
    audio.currentTime = (audio.duration / 100) * e.target.value;
    setPercentage(e.target.value);
  };

  const onBackSkip = () => {
    const audio = audioRef.current;
    if (currentTime < 5 && index === 0) {
      displaySong(songs[songs.length - 1]);
      setIsPlaying(true);
    } else if (currentTime < 5 && index !== 0) {
      displaySong(songs[index - 1]);
      setIsPlaying(true);
    } else {
      audio.play();
      audio.currentTime = 0;
      setIsPlaying(true);
    }
  };

  const onPlay = () => {
    const audio = audioRef.current;
    if (!isPlaying) {
      setIsPlaying(true);
      audio.play();
    } else if (isPlaying) {
      setIsPlaying(false);
      audio.pause();
    }
  };

  const onSkip = useCallback(() => {
    const audio = audioRef.current;
    if (songs.length === 1) {
      audio.play();
      audio.currentTime = 0;
      setIsPlaying(true);
    } else if (index + 1 === songs.length) {
      displaySong(songs[0]);
      setIsPlaying(true);
      setPercentage(0);
    } else {
      displaySong(songs[index + 1]);
      setIsPlaying(true);
      setPercentage(0);
    }
  }, [displaySong, index, songs]);

  useEffect(() => {
    setCurrentSong(song.url);

    const songComplete = () => {
      if (percentage === 100 && isPlaying) onSkip();
    };
    const newSongSelected = () => {
      if (currentSong !== song.url) setIsPlaying(true);
    };

    newSongSelected();
    songComplete();
  }, [
    currentSong,
    displaySong,
    index,
    isPlaying,
    percentage,
    onSkip,
    song.url
  ]);

  const getCurrentDuration = e => {
    const percent = (
      (e.currentTarget.currentTime / e.currentTarget.duration) *
      100
    ).toFixed(2);
    const time = e.currentTarget.currentTime;
    setPercentage(+percent);
    setCurrentTime(time.toFixed(2));
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h1>{song.name}</h1>
      <Slider
        duration={duration}
        currentTime={currentTime}
        onChange={onChange}
        percentage={percentage}
      />
      <audio
        ref={audioRef}
        src={song.url}
        onLoadedData={e => {
          setDuration(e.currentTarget.duration.toFixed(2));
        }}
        onTimeUpdate={getCurrentDuration}
        autoPlay={true}></audio>
      <div>
        <button className="btn btn-link" onClick={onBackSkip}>
          <SkipBackwardFill />
        </button>
        <button className="btn btn-link" onClick={onPlay}>
          {isPlaying ? <PauseCircleFill /> : <PlayCircleFill />}
        </button>
        <button className="btn btn-link" onClick={onSkip}>
          <SkipForwardFill />
        </button>
      </div>
    </div>
  );
}
