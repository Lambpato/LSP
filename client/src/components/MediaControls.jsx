import { useState } from "react";
import { SkipBackwardFill, PlayCircleFill, SkipForwardFill } from "react-bootstrap-icons";
import Slider from "./Slider";

export default function MediaControls({song, onClickSkpBck, onClickPse, onClickSkp }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState('');
  const [percentage, setPercentage] = useState(0);

  const onClickPsePly = () => {
    setIsPlaying(!isPlaying);
  };

  const onChange = (e) => {
    setPercentage(e.target.value);
  };

  return (
  <div className="container">
  <h1>{song}</h1>
  <Slider onChange={onChange} percentage={percentage}/>
    <div>
      <button className="btn btn-link" onClick={onClickSkpBck}><SkipBackwardFill /></button>
      <button className="btn btn-link" onClick={onClickPsePly}><PlayCircleFill /></button>
      <button className="btn btn-link" onClick={onClickSkp}><SkipForwardFill /></button>
    </div>
  </div>
 )
};
