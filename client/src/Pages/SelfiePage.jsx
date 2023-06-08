import NavBar from "../components/NavBar";
import Selfie from "../components/Selfie";

export default function SelfiePage () {
  return (
    <div className="position-absolute top-0 start-0 bottom-0 end-0">
      <NavBar action={'Back'} />
      <Selfie />
    </div>
  )
};
