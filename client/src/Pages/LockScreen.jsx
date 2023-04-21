import MediaQuery from '../components/MediaQuery';
import '../css/LockScreen.css'
import { useState } from 'react';
import Welcome from './Welcome';
import About from '../components/About';


export default function LockScreen() {
  const [action, setAction] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    setAction('register');
  }

  const handleLogIn = (e) => {
    e.preventDefault();
    setAction('LogIn')
    console.log(action)
  }
  return (

    <div className={MediaQuery() ? 'row welcome px-5 mx-auto pt-5 position-absolute' : 'position-absolute top-0 start-0 bottom-0 end-0'}>
     <Welcome handleRegister={handleRegister} handleLogIn={handleLogIn} action={action}/>
      {MediaQuery() ?
      <About/>
        :
        undefined}
    </div>
  );
};
