import RegIn from "../components/RegIn";
import About from "../components/About";
import MediaQuery from "../components/MediaQuery";

export default function LockScreen({action, onLogIn}) {

  return (
    action !== '' ?
    <div className={MediaQuery() ? 'row position-absolute top-0 start-0 bottom-0 end-0' : 'position-absolute top-0 start-0 bottom-0 end-0'}>
      <RegIn action={action} onLogIn={onLogIn}/>
      {MediaQuery() ? <About/> : undefined}
    </div>
    : undefined
  );
};
