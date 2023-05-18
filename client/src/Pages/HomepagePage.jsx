import HomePage from '../components/HomePage';
import NavBar from '../components/NavBar';
import settings from '../public/icons/Settings.png';
import language from '../public/icons/Language.png';
import photos from '../public/icons/Photos.png';
import camera from '../public/icons/Camera.png';
import data from '../public/icons/Data.png';
import music from '../public/icons/Music.png';
import plus from '../public/icons/Plus.png';
import { useContext } from 'react';
import { ActionContext } from '../components/ActionContext';

export default function HomepagePage () {

const { handleLanguage, handleCamera, handleSavedPhotos, handleNewSong, handleSavedSongs, handleLogOut } = useContext(ActionContext);

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
      name: 'Photos',
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
      <NavBar onClick={handleLogOut} action={'Log Out'} />
      <div className="mx-auto my-auto">
        <HomePage icons={icons} />
      </div>
    </div>
  )
}
