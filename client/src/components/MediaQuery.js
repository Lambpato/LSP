import { useMediaQuery } from 'react-responsive'

export default function MediaQuery(){
    const desktop = useMediaQuery({ query: '(min-width: 768px)' });
  return (desktop);
};
