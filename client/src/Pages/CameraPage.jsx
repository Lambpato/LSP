import Camera from "../components/Camera"
import NavBar from "../components/NavBar"

export default function CameraPage () {
  return (
    <div className="position-absolute top-0 start-0 bottom-0 end-0">
    <NavBar action={'Back'} />
    <Camera />
    </div>
  )
};
