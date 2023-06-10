import { useState } from "react";
import { SkipBackwardFill, PlayCircleFill, SkipForwardFill } from "react-bootstrap-icons";

export default function MediaControls({song, onClickSkpBck, onClickPse, onClickSkp }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState('');

  const onClickPsePly = () => {
    setIsPlaying(!isPlaying);
  };

  return (
  <div className="container">
  <h1>{song}</h1>
    <div>
      <button className="btn btn-link" onClick={onClickSkpBck}><SkipBackwardFill /></button>
      <button className="btn btn-link" onClick={onClickPsePly}><PlayCircleFill /></button>
      <button className="btn btn-link" onClick={onClickSkp}><SkipForwardFill /></button>
    </div>
  </div>
 )
};
