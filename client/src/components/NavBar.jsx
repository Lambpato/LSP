import BackButton from "./BackButton"
import Time from "./Time"

export default function NavBar ({action}) {

  return (
    <div className="d-flex flex-row justify-content-between bg-light bg-gradient fw-semibold">
      <BackButton action={action} />
      <Time />
    </div>
  )
};
