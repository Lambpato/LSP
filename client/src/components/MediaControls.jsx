import { useState, useRef, useEffect } from "react";
import { SkipBackwardFill, PlayCircleFill, PauseCircleFill, SkipForwardFill } from "react-bootstrap-icons";
import Slider from "./Slider";

export default function MediaControls({song, current, displaySong, songs}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const audioRef = useRef();

  const onChange = (e) => {
    const audio = audioRef.current;
    audio.currentTime = (audio.duration / 100) * e.target.value;
    setPercentage(e.target.value)
  };

  const onBackSkip = () => {
    const audio = audioRef.current;
    if (currentTime > 5) {
      setCurrentTime(0);
      setPercentage(0);
      audio.currentTime = 0
    } else if (currentTime < 5 && current === 1) {
      displaySong(songs.songId);
      setIsPlaying(true);
    } else {
      displaySong(current - 1);
      setIsPlaying(true);
    };
  };

  const onPlay = () => {
    const audio = audioRef.current;
    if(!isPlaying) {
       setIsPlaying(true);
      audio.play();
    } else if (isPlaying) {
       setIsPlaying(false);
      audio.pause();
    };
   };

   const onSkip = () => {
    setCurrentTime(0);
    setPercentage(0);
    setIsPlaying(true);
     if (current === songs.length) {
      displaySong(1);
     } else {
      displaySong(current + 1);
     };
   };

   useEffect(() => {
    const songComplete = () => {
      if(percentage === 100 && isPlaying) {
        return onSkip();
      };
    };

    songComplete();
   });

  const getCurrentDuration = (e) => {
    const percent = ((e.currentTarget.currentTime / e.currentTarget.duration) * 100).toFixed(2);
    const time = e.currentTarget.currentTime;
    setPercentage(+percent);
    setCurrentTime(time.toFixed(2));
  };

  return (
  <div className="d-flex flex-column align-items-center">
    <h1>{song.name}</h1>
    <Slider duration={duration} currentTime={currentTime} onChange={onChange} percentage={percentage} />
    <audio
      ref={audioRef}
      src={song.url}
      onLoadedData={(e) => {setDuration(e.currentTarget.duration.toFixed(2))}}
      onTimeUpdate={getCurrentDuration}
      autoPlay={true}
    ></audio>
    <div>
      <button className="btn btn-link" onClick={onBackSkip}><SkipBackwardFill /></button>
      <button className="btn btn-link" onClick={onPlay}>{isPlaying ?<PauseCircleFill />  : <PlayCircleFill />}</button>
      <button className="btn btn-link" onClick={onSkip}><SkipForwardFill /></button>
    </div>
  </div>
 )
};
