import { useState, useEffect, useContext } from 'react';
import { ActionContext } from './ActionContext';
import { FileEarmarkImageFill } from 'react-bootstrap-icons';
import { Modal } from 'bootstrap';
import data from '../public/icons/Data.png';
import DeleteModal from './DeleteModal';;

export default function Selfie ({ userId }) {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const [activeImg, setActiveImg] = useState('');
  const [keyPressed, setKeyPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const { token } = useContext(ActionContext);


  useEffect(() => {
  const getImages = async () => {
    try {
      const response = await fetch(`/api/${userId}/images`, {
        headers: {
        'Authorization': `Bearer ${token}`
        }
      });
      if(!response.ok) throw new Error(`Error Code: ${response.status} Error Message: ${response.statusText}`);
      const imagesJson = await response.json();
      setImages(imagesJson);
    } catch (err) {
      setError(err);
      console.error(err);
    } finally {
      setIsLoading(false);
    };
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'D') {
    setKeyPressed(true);
    };
  });

  if(current !== 0 && keyPressed) {
    const myModal = new Modal(document.getElementById("delete-modal"));
    setKeyPressed(false)
    myModal.show();
  } else if (current === 0 && keyPressed){
    setKeyPressed(false);
  };

   getImages();

  }, [current, keyPressed, userId, token, activeImg]);

  const displayImage = (imageId) => {
    current !== imageId ? setCurrent(imageId) : setCurrent(0);
    const currentImg = async (i) => {
       try {
        const response = await fetch(`/api/${userId}/images/${imageId}`, {
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
          }
        });
      if (!response.ok) throw new Error(`Error Code: ${response.status} Error Message: ${response.statusText}`);
      const imageJson = await response.json();
      const { url } = imageJson
      activeImg !== url ? setActiveImg(url) : setActiveImg('');
     } catch (err) {
      console.error(err);
     };
    };
    currentImg();
  };

  const reset = () => {
    setActiveImg('');
    setCurrent(0);
    setKeyPressed(false);
  };

  if(isLoading) return <div>Loading ...</div>;

  if(error) {
    console.error(`Fetch Error: ${error}`);
    return <div>Error! {error.message}</div>
  };

  return(
    <>
      <DeleteModal userId={userId} path={'images'} id={current} reset={reset} />
      <div>
        <div className="d-flex">
          <img src={data} alt="photos"></img>
          <p>Photos</p>
        </div>

        <div>
          <ImageList images={images} onClick={displayImage} />
        </div>


      { activeImg !== '' ? <div><img src={activeImg} alt='selfie' /></div> : undefined}
     </div>
    </>

  )
};

function ImageList ({images, onClick}) {

  if(images.length === 0) return <p>Oops no photos, take a selfie at the camera <a href="/camera" className="link-secondary">page</a>!</p>

  const imagesList = images.map(images =>
    <li role="button" className="d-flex gap-2" key={images.imageId} onClick={() => onClick(images.imageId)} >
      <FileEarmarkImageFill />
      <p className="mb-0 align-items-center">{images.url}</p>
    </li> );

  return   <ul className="list-unstyled">{imagesList}</ul>
};
