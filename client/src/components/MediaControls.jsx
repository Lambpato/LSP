import { useState, useRef } from "react";
import { SkipBackwardFill, PlayCircleFill, PauseCircleFill, SkipForwardFill } from "react-bootstrap-icons";
import Slider from "./Slider";

export default function MediaControls({song, onClickSkpBck, onClickSkp }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const audioRef = useRef();

  const onChange = (e) => { setPercentage(e.target.value) };
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

  return (
  <div className="container">
  <h1>{song}</h1>
  <Slider onChange={onChange} percentage={percentage}/>
  <audio
  ref={audioRef}
  src={song}
  onLoadedData={(e) => {
    console.log(e.currentTarget.duration);
    setDuration(e.currentTarget.duration.toFixed(2));
  }}
  onTimeUpdate={(e) => {
    console.log(e.currentTarget.duration);
  }}
  ></audio>
    <div>
      <button className="btn btn-link" onClick={onClickSkpBck}><SkipBackwardFill /></button>
      <button className="btn btn-link" onClick={onPlay}>{isPlaying ? <PlayCircleFill /> : <PauseCircleFill/>}</button>
      <button className="btn btn-link" onClick={onClickSkp}><SkipForwardFill /></button>
    </div>
  </div>
 )
};
