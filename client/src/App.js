import './App.css';
import WelcomePage from './Pages/WelcomePage';
import LockScreen from './Pages/LockScreen'
import Background from './components/Background';
import HomepagePage from './Pages/HomepagePage';
import GuidePage from './Pages/GuidePage';
import CameraPage from './Pages/CameraPage';
import PhotosPage from './Pages/PhotosPage';
import NewSongPage from './Pages/NewSongPage';
import SongPage from './Pages/SongPage';
import jwtDecode from 'jwt-decode';
import { useState, useEffect } from 'react';
import { ActionContextProvider } from './components/ActionContext';
import { Routes, Route, useNavigate } from 'react-router-dom';

const tokenKey = 'react-context-jwt';

export default function App() {
  const nagivate = useNavigate();
  const [userId, setUserId] = useState();
  const [authorized, setAuthorized] = useState(true);

    useEffect(() => {
    const token = localStorage.getItem(tokenKey);
    const user = token ? jwtDecode(token) : null;
    setUserId(user.userId);
    setAuthorized(false);
  }, []);

  if (authorized) return null;

   const handleLogIn = (result) => {
    const { token } = result;
    localStorage.setItem(tokenKey, token);
    // setUserId(user);
    nagivate('/homepage');
  }

  const handleLogOut = () => {
    localStorage.removeItem(tokenKey);
    setUserId(undefined);
    nagivate('/log-in');
  }

 return (
    <ActionContextProvider>
      <Routes>
        <Route path='/' element={<Background/>}>
          <Route index element={<WelcomePage/>} />
          <Route path='log-in' element={<LockScreen action={'log-in'} onLogIn={handleLogIn}/>}/>
          <Route path='register' element={<LockScreen action={'register'}/>}/>
          <Route path='homepage' element={<HomepagePage onLogOut={handleLogOut}/>}/>
          <Route path='guide' element={<GuidePage/>}/>
          <Route path='camera' element={<CameraPage userId={userId}/>}/>
          <Route path='photos' element={<PhotosPage userId={userId}/>}/>
          <Route path='songs/new' element={<NewSongPage userId={userId}/>} />
          <Route path='songs' element={<SongPage userId={userId}/>} />
        </Route>
      </Routes>
    </ActionContextProvider>
  );
}
