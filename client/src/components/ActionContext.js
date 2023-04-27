import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

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
    nagivate('/photos');
  };

  const handleNewSong = () => {
    nagivate('/songs/new');
  };

  const handleSavedSongs = () => {
    nagivate('/songs');
  };

  const handleBack = () =>  {
    console.log('fart')
    nagivate(-1)};

  const tokenKey = 'react-context-jwt';
  const [user, setUser] = useState();
  const [authorized, setAuthorized] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(tokenKey);
    const user = token ? jwtDecode(token) : null;
    setUser(user);
    setAuthorized(false);
  }, []);

   const handleSignIn = (result) => {
    const { user, token } = result;
    localStorage.setItem(tokenKey, token);
    setUser(user);
    nagivate('/homepage');
  }

  const handleLogOut = () => {
    localStorage.removeItem(tokenKey);
    setUser(undefined);
  }

  if (authorized) return null;



  const contextValue = {
    handleRegister,
    handleLogIn,
    handleLanguage,
    handleCamera,
    handleSavedPhotos,
    handleNewSong,
    handleSavedSongs,
    handleSignIn,
    handleLogOut,
    handleBack,
    user
  }

  return (
    <ActionContext.Provider value={contextValue}>
      {props.children}
    </ActionContext.Provider>
  );
}
