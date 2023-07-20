import WelcomePage from './Pages/WelcomePage';
import LockScreen from './Pages/LockScreen';
import Background from './components/Background';
import HomePage from './Pages/HomePage';
import GuidePage from './Pages/GuidePage';
import CameraPage from './Pages/CameraPage';
import PhotosPage from './Pages/PhotosPage';
import NewSongPage from './Pages/NewSongPage';
import SongPage from './Pages/SongPage';
import { useState, useEffect } from 'react';
import { ActionContextProvider } from './components/ActionContext';
import { Routes, Route, useNavigate } from 'react-router-dom';

export default function App() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState();
  const [authorizing, setAuthorizing] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) setUserId(user.user.userId);
    setAuthorizing(false);
  }, []);

  if (authorizing) return null;

  const handleLogIn = result => {
    localStorage.setItem('user', JSON.stringify(result));
    navigate('/homepage');
  };

  const handleLogOut = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <ActionContextProvider>
      <Routes>
        <Route path="/" element={<Background />}>
          <Route index element={<WelcomePage />} />
          <Route
            path="log-in"
            element={
              <LockScreen
                button={'Log In'}
                action={'log-in'}
                onLogIn={handleLogIn}
              />
            }
          />
          <Route
            path="register"
            element={<LockScreen button={'Register'} action={'register'} />}
          />
          <Route
            path="homepage"
            element={<HomePage onLogOut={handleLogOut} />}
          />
          <Route path="guide" element={<GuidePage />} />
          <Route path="camera" element={<CameraPage userId={userId} />} />
          <Route path="photos" element={<PhotosPage userId={userId} />} />
          <Route path="songs/new" element={<NewSongPage userId={userId} />} />
          <Route path="songs" element={<SongPage userId={userId} />} />
        </Route>
      </Routes>
    </ActionContextProvider>
  );
}
