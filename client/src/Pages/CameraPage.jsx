import Camera from "../components/Camera";
import NavBar from "../components/NavBar";
import { ActionContext } from "../components/ActionContext";
import { useContext } from "react";

export default function CameraPage () {
  const { handleBack } = useContext(ActionContext);
  return (
    <div className="position-absolute top-0 start-0 bottom-0 end-0">
    <NavBar onClick={handleBack} action={'Back'} />
    <Camera />
    </div>
  )
};
