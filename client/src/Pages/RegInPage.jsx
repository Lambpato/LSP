import RegIn from "../components/RegIn";
import About from "../components/About";
import MediaQuery from "../components/MediaQuery";
import { useContext } from "react";
import { ActionContext } from "../components/ActionContext";



export default function RegInPage({action, onSignIn}) {

  const { handleSignIn } = useContext(ActionContext);

    return (
      action !== '' ?
        <div className={MediaQuery() ? 'row position-absolute top-0 start-0 bottom-0 end-0' : 'position-absolute top-0 start-0 bottom-0 end-0'}>
    <RegIn action={action}  onSignIn={handleSignIn} />
    {MediaQuery() ? <About/> : undefined}
    </div>
    : undefined
  );
};
