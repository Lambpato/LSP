import NavBar from '../components/NavBar';
import SongForm from '../components/SongForm';
import { ActionContext } from '../components/ActionContext';
import { useContext, useEffect } from 'react';

export default function SongFormPage({ userId }) {
  const { handleBack, ifLoggedOut } = useContext(ActionContext);

  useEffect(() => {
    ifLoggedOut();
  }, [ifLoggedOut]);

  return (
    <div className="position-absolute top-0 start-0 bottom-0 end-0">
      <NavBar text={'Back'} onClick={handleBack} />
      <SongForm userId={userId} />
    </div>
  );
}
