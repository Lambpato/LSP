import { Link } from 'react-router-dom';
import { ActionContext } from '../components/ActionContext';

export default function RegButton ({handleClick, name}) {
  const { action } = ActionContext;
  return (
    <Link to={"/" + action}><button className='rounded-pill mb-4 btn btn-primary bg-light border border-dark' type="button" onClick={handleClick}>{name}</button></Link>
)
}
