import Webcam from 'react-webcam';
import CameraButton from './CameraButton';
import { useContext, useRef } from 'react';
import { ActionContext } from './ActionContext';

export default function Camera ({userId}) {
  const { mediaQuery } = useContext(ActionContext);
  const selfieRef = useRef(null);
  let width = 840;
  let height = 840;

  if(!mediaQuery) {width=360; height=360;}

  const photoConstraints = {
    width: 1080,
    height: 1080,
    facingMode: "user"
  };

  return (
    <div className={`d-flex justify-content-center ${mediaQuery ? 'mt-5' : 'mt-2'}`}>
      <Webcam
        audio={false}
        height={height}
        ref={selfieRef}
        screenshotFormat="image/png"
        width={width}
        videoConstraints={photoConstraints}
        mirrored={true}
      />
      <CameraButton selfie={selfieRef} userId={userId}/>
    </div>
  )
};
