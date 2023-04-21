import './App.css';
import LockScreen from './Pages/LockScreen'
import Background from './components/Background';
import AppContext from './components/AppContext';
import { useState } from 'react';
// import { Routes, Route } from 'react-router-dom'

export default function App() {
 return (
      <div  className="App">
        <LockScreen/>
        <Background/>
      </div>
  );
}
