import Webcam from 'react-webcam';
import CameraButton from './CameraButton';
import { useState, useContext, useRef } from 'react';
import { ActionContext } from './ActionContext';

export default function Camera({ userId }) {
  const [pressed, setPressed] = useState(false);
  const { mediaQuery } = useContext(ActionContext);

  const selfieRef = useRef(null);
  let width = 720;
  let height = 720;

  if (!mediaQuery) {
    width = 360;
    height = 360;
  }

  const photoConstraints = {
    width: 1080,
    height: 1080,
    facingMode: 'user'
  };

  const isPressed = () => setPressed(true);
  const notPressed = () => setPressed(false);

  return (
    <div
      className={`d-flex justify-content-center ${
        mediaQuery ? 'mt-5' : 'mt-2'
      }`}>
      <div className="position-relative">
        {pressed ? (
          <div className="z-3 position-absolute top-0 start-0 bottom-0 end-0 bg-white opacity-75"></div>
        ) : undefined}
        <Webcam
          audio={false}
          height={height}
          ref={selfieRef}
          screenshotFormat="image/png"
          width={width}
          videoConstraints={photoConstraints}
          mirrored={true}
        />
      </div>
      <CameraButton
        isPressed={isPressed}
        notPressed={notPressed}
        selfie={selfieRef}
        userId={userId}
      />
    </div>
  );
}
