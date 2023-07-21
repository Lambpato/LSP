import Time from './Time';

export default function NavBar({ text, onClick }) {
  return (
    <div className="d-flex flex-row justify-content-between bg-light bg-gradient fw-semibold">
      <BackButton text={text} onClick={onClick} />
      <Time />
    </div>
  );
}

function BackButton({ text, onClick }) {
  return (
    <button
      type="button"
      className="btn align-self-start fw-semibold"
      onClick={onClick}>
      {text}
    </button>
  );
}
