import { useState, useEffect, useContext } from 'react';
import { ActionContext } from './ActionContext';
import { FileEarmarkImageFill } from 'react-bootstrap-icons';
import data from '../public/icons/Data.png';
import ToggleModal from './DeleteModal';

export default function Photos () {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const [activeImg, setActiveImg] = useState('');
  const [deleteImg, setDeleteImg] = useState(false);
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

    window.addEventListener('keydown', detectKey);

    getImages();
  },);

  const detectKey = (e) => {
    if ((e.key === 'D' && current !== 0) || (e.key === 'd' && current !== 0)) {
    setDeleteImg(!deleteImg);
    console.log(e.key);
    };
  };

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

  return(
    <>
    <ToggleModal action={'images'} id={current}/>
     <div>
      <div className="d-flex">
        <img src={data} alt='photos'></img>
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
              <p className="mb-0 align-items-center">{`${images.url}`}</p>
           </li> );

           return   <ul className='list-unstyled'> {imagesList} </ul>
          };
