import { useContext } from "react";
import RegIn from "../components/RegIn";
import About from "../components/About";
import MediaQuery from "../components/MediaQuery";
import { ActionContext } from "../components/ActionContext";



export default function RegInPage() {
  const { action } = useContext(ActionContext);

    return (
      action === '' ?
    <div className={MediaQuery() ? 'row welcome px-5 mx-auto pt-5 position-absolute' : 'position-absolute top-0 start-0 bottom-0 end-0'}>

    <RegIn action={action}/>
    {MediaQuery() ? <About/> : undefined}
    </div>
    : undefined
  );
};
