import RegIn from "../components/RegIn";
import About from "../components/About";
import { ActionContext } from '../components/ActionContext';
import { useContext, useEffect } from "react";

export default function LockScreen({action, onLogIn}) {
  const { mediaQuery, ifLoggedIn } = useContext(ActionContext);

  useEffect(() => {
      ifLoggedIn()
  },[ifLoggedIn]);

  return (
    action !== '' ?
    <div className={mediaQuery ? 'row position-absolute top-0 start-0 bottom-0 end-0' : 'position-absolute top-0 start-0 bottom-0 end-0'}>
      <RegIn action={action} onLogIn={onLogIn}/>
      {mediaQuery ? <About/> : undefined}
    </div>
    : undefined
  );
};
