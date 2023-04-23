import './App.css';
import LockScreen from './Pages/LockScreen'
import Background from './components/Background';
// import AppContext from './components/AppContext';
import RegInPage from './Pages/RegInPage';
import { ActionContextProvider } from './components/ActionContext';
import { Routes, Route } from 'react-router-dom'

export default function App() {
 return (
    <ActionContextProvider>
      <Routes>
        <Route path='/' element={<Background/>}>
          <Route index element={ <LockScreen/>}/>
          <Route path='log-in' element={<RegInPage action={'log-in'}/>}/>
          <Route path='register' element={<RegInPage action={'register'}/>}/>
        </Route>
      </Routes>
    </ActionContextProvider>
  );
}
