import MediaQuery from '../components/MediaQuery';
import { useContext } from 'react';
import Welcome from '../components/Welcome';
import About from '../components/About';
import { ActionContext } from '../components/ActionContext';

export default function LockScreen() {
  const { handleLogIn, handleRegister, action } = useContext(ActionContext);
  return (
    <div className={MediaQuery() ? 'row position-absolute top-0 start-0 bottom-0 end-0' : 'position-absolute top-0 start-0 bottom-0 end-0'}>
     <Welcome handleRegister={handleRegister} handleLogIn={handleLogIn} action={action}/>
      {MediaQuery() ? <About/> : undefined}
    </div>
  );
};
