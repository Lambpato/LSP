import Webcam from 'react-webcam';
import { useRef } from 'react';
import { StopCircle } from 'react-bootstrap-icons';
import MediaQuery from './MediaQuery';


export default function Camera () {
  const photoConstraints = {
    width: 1080,
    height: 1080,
    facingMode: "user"
  };

  const selfieRef = useRef(null);
  // const imageSrc = selfieRef.current.getScreenshot();
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
    <button type='button' className='btn-lg btn fs-1 text-light position-absolute align-self-end'>
      <StopCircle />
    </button>
    </div>
  )
};
