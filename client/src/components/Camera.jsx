import Webcam from 'react-webcam';
import { useRef } from 'react';
import MediaQuery from './MediaQuery';
import CameraButton from './CameraButton';

export default function Camera () {
  const photoConstraints = {
    width: 1080,
    height: 1080,
    facingMode: "user"
  };

  const selfieRef = useRef(null);
  let width = 840;
  let height = 840;
  if(!MediaQuery()) {width=360; height=360;}

  return (
    <div className={`d-flex justify-content-center ${MediaQuery() ? 'mt-5' : 'mt-2'}`}>
      <Webcam
      audio={false}
      height={height}
      ref={selfieRef}
      screenshotFormat="image/png"
      width={width}
      videoConstraints={photoConstraints}
      mirrored={true}
      />
      <CameraButton selfie={selfieRef}/>
    </div>
  )
};
