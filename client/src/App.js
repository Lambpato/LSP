import './App.css';
import LockScreen from './Pages/LockScreen'
import Background from './components/Background';
// import AppContext from './components/AppContext';
import RegInPage from './Pages/RegInPage';
import { ActionContextProvider } from './components/ActionContext';
// import { Routes, Route } from 'react-router-dom'

export default function App() {
 return (

    <ActionContextProvider>

        <LockScreen/>
        <RegInPage/>
        <Background/>

    </ActionContextProvider>
  );
}
