import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'

export const ActionContext = createContext();

export function ActionContextProvider(props) {
  const nagivate = useNavigate();

  const mediaQuery = useMediaQuery({ query: '(min-width: 768px)' });
  const tokenKey = 'react-context-jwt';
  const token = localStorage.getItem(tokenKey);

  const handleRegister = (e) => {
    e.preventDefault();
    nagivate('/register');
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    nagivate('/log-in');
  };

  const ifLoggedIn = () => {
    token ? nagivate('/homepage') : nagivate('/log-in');
  };

  const handleGuide = () => { nagivate('/guide') };
  const handleCamera = () => { nagivate('/camera') };
  const handleSavedPhotos = () => { nagivate('/photos') };
  const handleNewSong = () => { nagivate('/songs/new') };
  const handleSavedSongs = () => { nagivate('/songs') };
  const handleBack = () =>  { nagivate(-1) };

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
    token,
    mediaQuery
  };

  return (
    <ActionContext.Provider value={contextValue}>
      {props.children}
    </ActionContext.Provider>
  );
}
