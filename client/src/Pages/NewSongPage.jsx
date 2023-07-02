import NavBar from '../components/NavBar';
import Song from  '../components/Song';
import { ActionContext } from '../components/ActionContext';
import { useContext, useEffect } from 'react';

export default function NewSongPage ({userId}) {
  const { handleBack, ifLoggedOut } = useContext(ActionContext);

  useEffect(() => {
    ifLoggedOut();
  }, [ifLoggedOut]);

  return (
    <div className="position-absolute top-0 start-0 bottom-0 end-0">
      <NavBar action={'Back'} onClick={handleBack}/>
      <Song userId={userId}/>
    </div>
  )
};
