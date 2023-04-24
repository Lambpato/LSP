import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const ActionContext = createContext();

export function ActionContextProvider(props) {
  const nagivate = useNavigate();

  const handleRegister = (e) => {
    nagivate('/register');
  }

  const handleLogIn = (e) => {
    e.preventDefault();
    nagivate('/log-in')
  }

  const contextValue = {
    handleRegister,
    handleLogIn
  }

  return (
    <ActionContext.Provider value={contextValue}>
      {props.children}
    </ActionContext.Provider>
  );
}
