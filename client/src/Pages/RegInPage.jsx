import RegIn from "../components/RegIn";
import About from "../components/About";
import MediaQuery from "../components/MediaQuery";
import { useNavigate } from 'react-router-dom';



export default function RegInPage({action, onSignIn}) {

  const navigate = useNavigate();
  const onLogIn = () => { navigate('/homepage')};

    return (
      action !== '' ?
        <div className={MediaQuery() ? 'row position-absolute top-0 start-0 bottom-0 end-0' : 'position-absolute top-0 start-0 bottom-0 end-0'}>
    <RegIn action={action}  onSignIn={onLogIn} />
    {MediaQuery() ? <About/> : undefined}
    </div>
    : undefined
  );
};
