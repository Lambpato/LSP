import MediaQuery from '../components/MediaQuery';
import Welcome from '../components/Welcome';
import About from '../components/About';
import { ActionContext } from '../components/ActionContext';
import { useContext, useEffect } from 'react';

export default function Home() {
  const { handleLogIn, handleRegister, ifLoggedIn } = useContext(ActionContext);

  useEffect(() => {
    ifLoggedIn()
  },[ifLoggedIn]);

  return (
    <div className={MediaQuery() ? 'row position-absolute top-0 start-0 bottom-0 end-0' : 'position-absolute top-0 start-0 bottom-0 end-0'}>
     <Welcome handleRegister={handleRegister} handleLogIn={handleLogIn} />
      {MediaQuery() ? <About/> : undefined}
    </div>
  );
};
