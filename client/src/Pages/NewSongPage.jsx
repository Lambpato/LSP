import NavBar from '../components/NavBar';
import Song from  '../components/Song';

export default function NewSongPage () {
  return (
    <div className="position-absolute top-0 start-0 bottom-0 end-0">
      <NavBar action={'Back'} />
      <Song />
    </div>
  )
};
