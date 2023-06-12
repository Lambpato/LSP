import '../componenent-styling/slider.css';
import '../componenent-styling/thumb.css';

import { useState, useEffect } from 'react';

export default function Slider ({onChange, percentage}) {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    setPosition(percentage);
  }, [percentage]);

  return (
    <div className="slider-container">
      <div className="progress-bar-over"></div>
      <div className="thumb"></div>
      <input type="range" step="0.01" value={position} className="range" onChange={onChange}></input>
    </div>
  )
}
