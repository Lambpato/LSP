import Home from '../components/Home';
import NavBar from '../components/NavBar';
import settings from '../public/icons/Settings.png';
import Guide from '../public/icons/Guide.png';
import photos from '../public/icons/Photos.png';
import camera from '../public/icons/Camera.png';
import data from '../public/icons/Data.png';
import music from '../public/icons/Music.png';
import plus from '../public/icons/Plus.png';
import { useContext, useEffect } from 'react';
import { ActionContext } from '../components/ActionContext';

export default function HomePage({ onLogOut }) {
  const {
    handleGuide,
    handleCamera,
    handleSavedPhotos,
    handleNewSong,
    handleSavedSongs,
    ifLoggedOut
  } = useContext(ActionContext);

  const icons = [
    {
      id: 1,
      name: 'Settings',
      imgUrl: settings,
      children: [
        {
          childId: 1,
          name: 'Guide',
          childUrl: Guide,
          onClick: handleGuide
        }
      ]
    },
    {
      id: 2,
      name: 'Photos',
      imgUrl: photos,
      children: [
        {
          childId: 1,
          name: 'Camera',
          childUrl: camera,
          onClick: handleCamera
        },
        {
          childId: 2,
          name: 'Photos',
          childUrl: data,
          onClick: handleSavedPhotos
        }
      ]
    },
    {
      id: 3,
      name: 'Music',
      imgUrl: music,
      children: [
        {
          childId: 1,
          name: 'New Song',
          childUrl: plus,
          onClick: handleNewSong
        },
        {
          childId: 2,
          name: 'Saved Songs',
          childUrl: data,
          onClick: handleSavedSongs
        }
      ]
    }
  ];

  useEffect(() => {
    ifLoggedOut();
  }, [ifLoggedOut]);

  return (
    <div className="position-absolute top-0 start-0 bottom-0 end-0 d-flex flex-column">
      <NavBar onClick={onLogOut} text={'Log Out'} />
      <div className="mx-auto my-auto">
        <Home icons={icons} />
      </div>
    </div>
  );
}
