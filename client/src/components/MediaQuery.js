import { useMediaQuery } from 'react-responsive';

export default function MediaQuery() {
  return useMediaQuery({ query: '(min-width: 768px)' });
}
