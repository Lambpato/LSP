export default function BackButton ({action, onClick}) {

  return (
    <button type="button" className="btn align-self-start fw-semibold" onClick={onClick}>{action}</button>
  );
};
