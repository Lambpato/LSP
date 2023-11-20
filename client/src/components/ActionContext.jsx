import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

export const ActionContext = createContext();

export function ActionContextProvider(props) {
  const [token, setToken] = useState();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    user ? setToken(user.token) : setToken('');
  }, [user]);

  const mediaQuery = useMediaQuery({ query: '(min-width: 768px)' });

  const deleteImgs = async username => {
    if (username === 'Example' || 'example') {
      try {
        const response = await fetch(`/api/images/${username}/`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok)
          throw new Error(
            `Error Code: ${response.status} Error Message: It Boken`
          );
      } catch (err) {
        console.error(err);
      }
    }
  };

  const deleteSongs = async username => {
    if (username === 'Example' || 'example') {
      try {
        const response = await fetch(`/api/songs/${username}/`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok)
          throw new Error(
            `Error Code: ${response.status} Error Message: It Boken`
          );
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleRegister = e => {
    e.preventDefault();
    navigate('/register');
  };

  const handleLogIn = e => {
    e.preventDefault();
    navigate('/log-in');
  };

  const ifLoggedIn = () => {
    if (token) navigate('/homepage');
  };
  const ifLoggedOut = () => {
    if (!token) navigate('/');
  };
  const handleGuide = () => {
    navigate('/guide');
  };
  const handleCamera = () => {
    navigate('/camera');
  };
  const handleSavedPhotos = () => {
    navigate('/photos');
  };
  const handleNewSong = () => {
    navigate('/songs/new');
  };
  const handleSavedSongs = () => {
    navigate('/songs');
  };
  const handleBack = () => {
    navigate('/homepage');
  };

  const contextValue = {
    handleRegister,
    handleLogIn,
    handleGuide,
    handleCamera,
    handleSavedPhotos,
    handleNewSong,
    handleSavedSongs,
    handleBack,
    ifLoggedIn,
    ifLoggedOut,
    deleteImgs,
    deleteSongs,
    mediaQuery,
    token
  };

  return (
    <ActionContext.Provider value={contextValue}>
      {props.children}
    </ActionContext.Provider>
  );
}
