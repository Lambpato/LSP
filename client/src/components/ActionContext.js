import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const ActionContext = createContext();

export function ActionContextProvider(props) {
  const nagivate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    nagivate('/register');
  }

  const handleLogIn = (e) => {
    e.preventDefault();
    nagivate('/log-in');
  }

  const handleLanguage = () => {
    nagivate('/language');
  };

  const handleCamera = () => {
    nagivate('/camera');
  };

  const handleSavedPhotos = () => {
    nagivate('/savedPhotos');
  };

  const handleNewSong = () => {
    nagivate('/newSong');
  };

  const handleSavedSongs = () => {
    nagivate('/savedSongs');
  };

  const contextValue = {
    handleRegister,
    handleLogIn,
    handleLanguage,
    handleCamera,
    handleSavedPhotos,
    handleNewSong,
    handleSavedSongs
  }

  return (
    <ActionContext.Provider value={contextValue}>
      {props.children}
    </ActionContext.Provider>
  );
}
