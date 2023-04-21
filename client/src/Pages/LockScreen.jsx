import MediaQuery from '../components/MediaQuery';
import '../css/LockScreen.css'
import { useContext } from 'react';
import Welcome from './Welcome';
import About from '../components/About';
import { ActionContext } from '../components/ActionContext';

export default function LockScreen() {
  const { handleLogIn, handleRegister, action } = useContext(ActionContext);
  return (
    <div className={MediaQuery() ? 'row welcome px-5 mx-auto pt-5 position-absolute' : 'position-absolute top-0 start-0 bottom-0 end-0'}>
     <Welcome handleRegister={handleRegister} handleLogIn={handleLogIn} action={action}/>
      {MediaQuery() ? <About/> : undefined}
    </div>
  );
};
