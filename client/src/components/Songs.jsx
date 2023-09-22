import { useState, useEffect, useContext } from 'react';
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
      <div className="row">
        <div className="col">
          <div className="d-flex">
            <img src={data} alt="songs"></img>
            <p>Songs</p>
          </div>
          <div>
            <SongList songs={songs} onClick={displaySong} />
          </div>
        </div>
        <div className="col">
          {activeSong.url && (
            <MediaControls
              song={activeSong}
              displaySong={displaySong}
              index={index}
              songs={songs}
            />
          )}
        </div>
      </div>
    </>
  );
}

const SongList = ({ songs, onClick }) => {
  if (songs.length === 0) {
    return (
      <p>
        Oops no songs, save a song at the{' '}
        <a href="/songs/new" className="link-secondary">
          upload page
        </a>
        !
      </p>
    );
  } else {
    return (
      <table>
        <thead>
          <tr>
            <th>Song</th>
            <th>Artist</th>
          </tr>
        </thead>
        <tbody>
          {songs.map(songs => (
            <tr role="button" key={songs.songId} onClick={() => onClick(songs)}>
              <td className="pe-4">
                <FileMusicFill />
                {songs.song}
              </td>
              <td>{songs.artist}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
};
