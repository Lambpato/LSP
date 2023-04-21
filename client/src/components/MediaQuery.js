import { useMediaQuery } from 'react-responsive'

export default function MediaQuery(){
  const desktop = useMediaQuery({ query: '(min-width: 750px)' });
  return (desktop);
}
