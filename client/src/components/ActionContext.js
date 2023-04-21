import { useState, createContext } from 'react'

export const ActionContext = createContext();

export function ActionContextProvider(props) {
  const [action, setAction] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    setAction('register');
  }

  const handleLogIn = (e) => {
    e.preventDefault();
    setAction('log-in')
    console.log(action)
  }

  const contextValue = {
    action,
    handleRegister,
    handleLogIn
  }

  return (
    <ActionContext.Provider value={contextValue}>
      {props.children}
    </ActionContext.Provider>
  );
}
