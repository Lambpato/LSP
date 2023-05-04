import { useState, useEffect, useContext } from 'react';
import { ActionContext } from './ActionContext';
import { FileEarmarkImageFill } from 'react-bootstrap-icons';
import data from '../icons/Data.png';

export default function Photos () {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const { globalToken } = useContext(ActionContext);

  useEffect(() => {
    const getImages = async () => {
      try {
        const response = await fetch('/api/images/', {
          headers: {
             'Authorization':`Bearer ${globalToken}`
          }
        });
        if(!response.ok) throw new Error(`Error Code: ${response.status} Error Message: It Boken`);
        const imagesJson = await response.json();
        setImages(imagesJson);
      } catch (err) {
        console.error(err);
      };
    };
    getImages();
  },);


  const displayImage = (i) => {
    current !== i ? setCurrent(i) : setCurrent(0);
    console.log(current);
  };

  return(
     <div>
      <div>
        <img src={data} alt='photos'></img>
        <p>Photos</p>
      </div>

      <div>
      <ImageList images={images} onClick={displayImage} />
      </div>

      <div>
      {current === images.imageId ? <img src={images.url} alt='selfie' /> : undefined}
      </div>
     </div>
  )
};

  const ImageList = ({images, onClick}) => {
    const imagesList = images.map(images =>
           <li className='d-flex gap-2' key={images.imageId} onClick={() => onClick(images.imageId)} >
              <FileEarmarkImageFill />
              <p>{`${images.url}.png`}</p>
           </li> );

           return   <ul className='list-unstyled'> {imagesList} </ul>
          };
