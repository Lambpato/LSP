import { StopCircle } from 'react-bootstrap-icons';
import { base64StringToBlob } from 'blob-util';
import { ActionContext } from './ActionContext';
import { useContext } from 'react';

export default function CameraButton({selfie}) {
  const { globalToken } = useContext(ActionContext);
  console.log(globalToken);
  const handleImage = async() => {
    let screenshot = selfie.current.getScreenshot();
    let base64 = screenshot.slice(22);
    let blob = base64StringToBlob(base64)
    console.log(blob);
    console.log(screenshot);
    const formData = new FormData();
    formData.append("image", blob);

  try {
    const response = await fetch('/api/images/upload/', {
      method: "POST",
      body: formData,
      headers: {
        'Authorization':`Bearer ${globalToken}`
      }
    });
    if(!response.ok) throw new Error(`Error Code: ${response.status} Error Message: It Boke`);
  } catch (err) {
    console.error(err);
  };
  }
return (
    <button onClick={handleImage} type='button' className='btn-lg btn fs-1 text-light position-absolute align-self-end'>
      <StopCircle />
    </button>
)

};
