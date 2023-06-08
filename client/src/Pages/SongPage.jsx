import NavBar from "../components/NavBar";
import Songs from "../components/Songs";

export default function SongPage () {
  return  (
    <div className="position=absolute top-0 start-0 bottom-0 end-0">
      <NavBar action={'Back'} />
      <Songs />
    </div>
  )
};
