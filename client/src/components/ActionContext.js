import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'

export const ActionContext = createContext();

export function ActionContextProvider(props) {
  const navigate = useNavigate();

  const mediaQuery = useMediaQuery({ query: '(min-width: 768px)' });
  const tokenKey = 'react-context-jwt';
  const token = localStorage.getItem(tokenKey);

  const handleRegister = (e) => {
    e.preventDefault();
    navigate('/register');
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    navigate('/log-in');
  };

  const ifLoggedIn = () => { if(token) navigate('/homepage') };
  const ifLoggedOut = () => { if(!token) navigate('/') };
  const handleGuide = () => { navigate('/guide') };
  const handleCamera = () => { navigate('/camera') };
  const handleSavedPhotos = () => { navigate('/photos') };
  const handleNewSong = () => { navigate('/songs/new') };
  const handleSavedSongs = () => { navigate('/songs') };
  const handleBack = () =>  { navigate('/homepage') };

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
    mediaQuery,
    token
  };

  return (
    <ActionContext.Provider value={contextValue}>
      {props.children}
    </ActionContext.Provider>
  );
}
