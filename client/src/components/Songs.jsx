import { useState, useEffect, useContext } from 'react';
import { ActionContext } from './ActionContext';
import { FileMusicFill } from 'react-bootstrap-icons';
import { Modal } from 'bootstrap';
import data from '../public/icons/Data.png';
import MediaControls from './MediaControls';
import DeleteModal from './DeleteModal';

export default function Songs () {
  const [songs, setSongs] = useState([]);
  const [current, setCurrent] = useState(0);
  const [activeSong, setActiveSong] = useState('');
  const [keyPressed, setKeyPressed] = useState(false);
  const { globalToken } = useContext(ActionContext);

  useEffect(() => {
    const getSongs = async () => {
      try {
        const response = await fetch('/api/songs/', {
          headers: {
            'Authorization': `Bearer ${globalToken}`
          }
        });
        if(!response.ok) throw new Error(`Error Code: ${response.status} Error Message: It Boken`);
        const songsJson = await response.json();
        setSongs(songsJson);
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
    console.log('hello')
  } else if (current === 0 && keyPressed){
    setKeyPressed(false);
  };

    getSongs();

  }, [current, globalToken, keyPressed]);

  const displaySong = (songId) => {
    setCurrent(songId);
    const currentSong = async (i) => {
       try {
        const response = await fetch(`/api/songs/${songId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${globalToken}`
          }
        });
      if (!response.ok) throw new Error(`Error Code: ${response.status} Error Message: It Boken`);
      const songJson = await response.json();
      const song = songJson
      activeSong !== song.url ? setActiveSong(song) : setActiveSong('');
     } catch (err) {
      console.error(err);
     };
    };
    currentSong();
  };

    const reset = () => {
    setActiveSong('');
    setCurrent(0);
    setKeyPressed(false);
  };

  return(
    <>
      <DeleteModal path={'songs'} id={current} reset={reset} />
      <div className="d-flex justify-content-between">
        <div>
          <div className="d-flex">
            <img src={data} alt="songs"></img>
            <p>Songs</p>
          </div>

          <div>
            <SongList songs={songs} onClick={displaySong}/>
          </div>
        </div>
        <MediaControls song={activeSong} displaySong={displaySong} current={current}  songs={songs} />
      </div>
    </>


  )
};

  const SongList = ({songs, onClick}) => {
    const songsList = songs.map(songs =>
      <li className="d-flex gap-2" key={songs.songId} onClick={() => onClick(songs.songId)}>
        <FileMusicFill />
        <p className="mb-0 align-items-center">{songs.name}</p>
      </li>);

      return <ul className="list-unstyled">{songsList}</ul>
  };