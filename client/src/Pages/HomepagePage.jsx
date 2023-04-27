import HomePage from '../components/HomePage';
import NavBar from '../components/NavBar';
import settings from '../icons/Settings.png';
import language from '../icons/Language.png';
import photos from '../icons/Photos.png';
import camera from '../icons/Camera.png';
import data from '../icons/Data.png';
import music from '../icons/Music.png';
import plus from '../icons/Plus.png';
import { useContext } from 'react';
import { ActionContext } from '../components/ActionContext';

export default function HomepagePage () {

const { handleLanguage, handleCamera, handleSavedPhotos, handleNewSong, handleSavedSongs } = useContext(ActionContext);

  const icons = [{
    id: 1,
    name: 'Settings',
    imgUrl: settings,
    children: [{
      childId: 1,
      name: 'Language',
      childUrl: language,
      onClick: handleLanguage
    }]
  },
  {
    id: 2,
    name: 'Photos',
    imgUrl: photos,
    children: [{
      childId: 1,
      name: 'Camera',
      childUrl: camera,
      onClick: handleCamera
    },{
      childId: 2,
      name: 'Saved Photos',
      childUrl: data,
      onClick: handleSavedPhotos
    }]
  },
  {
    id: 3,
    name: 'Music',
    imgUrl: music,
      children: [{
        childId: 1,
        name:'New Song',
        childUrl: plus,
        onClick: handleNewSong
      }, {
        childId: 2,
        name: 'Saved Songs',
        childUrl: data,
        onClick: handleSavedSongs
      }]
}];

  return (
    <div className="position-absolute top-0 start-0 bottom-0 end-0 d-flex flex-column">
      <NavBar action={'Log Out'} />
      <div className="mx-auto my-auto">
        <HomePage icons={icons} />
      </div>
    </div>
  )
}
