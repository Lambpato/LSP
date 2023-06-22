import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

export const ActionContext = createContext();

export function ActionContextProvider(props) {
  const nagivate = useNavigate();
  const tokenKey = 'react-context-jwt';
  const [user, setUser] = useState();
  const [authorized, setAuthorized] = useState(true);
  const [globalToken, setGlobalToken] = useState();

  const handleRegister = (e) => {
    e.preventDefault();
    nagivate('/register');
  }

  const handleLogIn = (e) => {
    e.preventDefault();
    nagivate('/log-in');
  }
  const handleLanguage = () => { nagivate('/language') };
  const handleCamera = () => { nagivate('/camera') };
  const handleSavedPhotos = () => { nagivate('/photos') };
  const handleNewSong = () => { nagivate('/songs/new') };
  const handleSavedSongs = () => { nagivate('/songs') };
  const handleBack = () =>  { nagivate(-1) };

  useEffect(() => {
    const token = localStorage.getItem(tokenKey);
    setGlobalToken(token);
    const user = token ? jwtDecode(token) : null;
    setUser(user);
    setAuthorized(false);
    if(!token) nagivate('/log-in');
  }, [nagivate]);

   const handleSignIn = (result) => {
    const { user, token } = result;
    localStorage.setItem(tokenKey, token);
    setUser(user);
    nagivate('/homepage');
  }

  const handleLogOut = () => {
    localStorage.removeItem(tokenKey);
    setUser(undefined);
    nagivate('/log-in');
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
    user,
    globalToken
  }

  return (
    <ActionContext.Provider value={contextValue}>
      {props.children}
    </ActionContext.Provider>
  );
}
