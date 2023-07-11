import Time from "./Time"

export default function NavBar ({action, onClick}) {

  return (
    <div className="d-flex flex-row justify-content-between bg-light bg-gradient fw-semibold">
      <BackButton action={action} onClick={onClick} />
      <Time />
    </div>
  )
};

function BackButton ({action, onClick}) {

  return (
    <button type="button" className="btn align-self-start fw-semibold" onClick={onClick}>{action}</button>
  );
};
