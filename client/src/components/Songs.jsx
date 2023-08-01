import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ActionContext } from './ActionContext';
import { FileMusicFill } from 'react-bootstrap-icons';
import { Modal } from 'bootstrap';
import data from '../public/icons/Data.png';
import MediaControls from './MediaControls';
import DeleteModal from './DeleteModal';

export default function Songs({ userId }) {
  const [songs, setSongs] = useState([]);
  const [current, setCurrent] = useState({});
  const [index, setIndex] = useState(0);
  const [activeSong, setActiveSong] = useState({});
  const [keyPressed, setKeyPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [forbidden, setForbidden] = useState(false);
  const { token } = useContext(ActionContext);

  useEffect(() => {
    const demoData = [
      '/audio/1689235152806-audio.mp3',
      '/audio/1689235339915-audio.mp3',
      '/audio/1689235476562-audio.mp3'
    ];

    const getSongs = async () => {
      try {
        const response = await fetch(`/api/${userId}/songs/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok)
          throw new Error(
            `Error Code: ${response.status} Error Message: ${response.statusText}`
          );
        const songsJson = await response.json();
        setSongs(songsJson);
      } catch (err) {
        setError(err);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (demoData.includes(activeSong.url)) {
      setForbidden(true);
    } else {
      setForbidden(false);
    }

    document.addEventListener('keydown', e => {
      if (e.key === 'D') {
        setKeyPressed(true);
      }
    });

    if (current !== 0 && keyPressed) {
      const myModal = new Modal(document.getElementById('delete-modal'));
      setKeyPressed(false);
      myModal.show();
    } else if (current === 0 && keyPressed) {
      setKeyPressed(false);
    }

    getSongs();
  }, [current, token, keyPressed, userId, activeSong.url]);

  const displaySong = songPlaying => {
    setIndex(songs.indexOf(songPlaying));
    setCurrent(songPlaying);
    const currentSong = async i => {
      try {
        const response = await fetch(
          `/api/${userId}/songs/${songPlaying.songId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        );
        if (!response.ok)
          throw new Error(
            `Error Code: ${response.status} Error Message: ${response.statusText}`
          );
        const songJson = await response.json();
        const song = songJson;
        activeSong.url !== song.url ? setActiveSong(song) : setActiveSong({});
      } catch (err) {
        console.error(err);
      }
    };
    currentSong();
  };

  const reset = () => {
    setActiveSong({});
    setCurrent({});
    setKeyPressed(false);
  };

  const cancel = () => {
    setKeyPressed(false);
  };

  if (isLoading) return <div>Loading ...</div>;

  if (error) {
    console.error(`Fetch Error: ${error}`);
    return <div>Error! {error.message}</div>;
  }

  return (
    <>
      <DeleteModal
        path={'songs'}
        id={current.songId}
        reset={reset}
        cancel={cancel}
        forbidden={forbidden}
      />
      <div className="d-flex justify-content-between">
        <div>
          <div className="d-flex">
            <img src={data} alt="songs"></img>
            <p>Songs</p>
          </div>

          <div>
            {songs.length === 0 ? (
              <div>
                Save songs at the song upload <Link to="/songs/new">page</Link>
              </div>
            ) : (
              <SongList songs={songs} onClick={displaySong} />
            )}
          </div>
        </div>
        {activeSong.url && (
          <MediaControls
            song={activeSong}
            displaySong={displaySong}
            index={index}
            songs={songs}
          />
        )}
      </div>
    </>
  );
}

const SongList = ({ songs, onClick }) => {
  if (songs.lenght === 0)
    return (
      <p>
        Oops no songs, save a song at the{' '}
        <a href="/songs/new" className="link-secondary">
          upload page
        </a>
        !
      </p>
    );

  const songsList = songs.map(songs => (
    <li
      role="button"
      className="d-flex gap-2"
      key={songs.songId}
      onClick={() => onClick(songs)}>
      <FileMusicFill />
      <p className="mb-0 align-items-center">{songs.name}</p>
    </li>
  ));

  return <ul className="list-unstyled">{songsList}</ul>;
};
