import Photos from "../components/Photos";
import NavBar from "../components/NavBar";

export default function PhotosPage () {
  return (
    <div className="position-absolute top-0 start-0 bottom-0 end-0">
      <NavBar action={'Back'} />
      <Photos />
    </div>
  )
};
