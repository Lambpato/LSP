import NavBar from "../components/NavBar";
import Songs from "../components/Songs";
import { ActionContext } from "../components/ActionContext";
import { useContext } from "react";

export default function SongPage () {
  const { handleBack } = useContext(ActionContext);
  return  (
    <div className="position-absolute top-0 start-0 bottom-0 end-0">
      <NavBar action={'Back'} onClick={handleBack} />
      <Songs />
    </div>
  )
};
