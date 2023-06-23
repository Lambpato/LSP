import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const ActionContext = createContext();

export function ActionContextProvider(props) {
  const nagivate = useNavigate();

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
      if(token) nagivate('/homepage');
  };

  const handleLanguage = () => { nagivate('/language') };
  const handleCamera = () => { nagivate('/camera') };
  const handleSavedPhotos = () => { nagivate('/photos') };
  const handleNewSong = () => { nagivate('/songs/new') };
  const handleSavedSongs = () => { nagivate('/songs') };
  const handleBack = () =>  { nagivate(-1) };

  const contextValue = {
    handleRegister,
    handleLogIn,
    handleLanguage,
    handleCamera,
    handleSavedPhotos,
    handleNewSong,
    handleSavedSongs,
    handleBack,
    ifLoggedIn,
    token
  };

  return (
    <ActionContext.Provider value={contextValue}>
      {props.children}
    </ActionContext.Provider>
  );
}
