import { useState, useEffect, useContext } from 'react';
import { ActionContext } from './ActionContext';
import { FileEarmarkImageFill } from 'react-bootstrap-icons';
import data from '../public/icons/Data.png';
import { Modal } from 'bootstrap';
import DeleteModal from './DeleteModal';

export default function Selfie () {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const [activeImg, setActiveImg] = useState('');
  const [keyPressed, setKeyPressed] = useState(false);
  const { globalToken } = useContext(ActionContext);



  useEffect(() => {
  const getImages = async () => {
      try {
        const response = await fetch('/api/images/', {
          headers: {
             'Authorization': `Bearer ${globalToken}`
          }
        });
        if(!response.ok) throw new Error(`Error Code: ${response.status} Error Message: It Boken`);
        const imagesJson = await response.json();
        setImages(imagesJson);
      } catch (err) {
        console.error(err);
      };
    };

    const myModal = new Modal(document.getElementById("delete-modal"));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'D') {
      setKeyPressed(true);
      };
    });

  if(current !== 0 && keyPressed) {
    setKeyPressed(false)
    myModal.show();
  } else if (current === 0 && keyPressed){
    setKeyPressed(false);
  };

   getImages();

  }, [current, globalToken, keyPressed]);

  const displayImage = (imageId) => {
    current !== imageId ? setCurrent(imageId) : setCurrent(0);
    const currentImg = async (i) => {
       try {
        const response = await fetch(`/api/images/${imageId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${globalToken}`
          }
        });
      if (!response.ok) throw new Error(`Error Code: ${response.status} Error Message: It Boken`);
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

  return(
    <>
    <DeleteModal path={'images'} id={current} reset={reset} />
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

  const ImageList = ({images, onClick}) => {
    const imagesList = images.map(images =>
           <li className="d-flex gap-2" key={images.imageId} onClick={() => onClick(images.imageId)} >
              <FileEarmarkImageFill />
              <p className="mb-0 align-items-center">{images.url}</p>
           </li> );

           return   <ul className="list-unstyled">{imagesList}</ul>
          };
