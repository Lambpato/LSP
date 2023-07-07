import { useState } from "react";
import { RegIn } from '../lib';
import { useNavigate } from 'react-router-dom';


export default function RegisterPage ({ action, onLogIn }) {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [password, setPassword] = useState('');
  const numReg = /[0-9]+/;
  const upReg = /[A-Z]+/;
  const charReg = /[!@#$%^&*()]+/;

  const passwordReq =
    (password.length === 0) ? "A password is required."
  : (password.length < 8) ? "Your password is too short."
  : (password.length > 7 && !numReg.test(password)) ? "Please include a number"
  : (password.length > 7 && !upReg.test(password)) ?  "Please include a capital letter"
  : (password.length > 7 && !charReg.test(password)) ?  "Please include one of the following characters !, @, #, $, %, ^, &, *, (, or )"
  : "Strong Password";

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { username, password } = Object.fromEntries(formData.entries());
    try {
      const result = await RegIn(action, username, password);
      if (action === 'register') { navigate('/log-in') }
      else if(result.user && result.token) onLogIn(result);
    } catch (err) {
      setError(err);
      console.error(err);
    };
  };

  return (
    <div className="col mt-5">
       <form className="bg-light-subtle py-5 mx-5 rounded-5 d-flex flex-column align-items-center gap-4"
        method="post"
        onSubmit={handleSubmit}>
        <label className="form-label">
          <input
          required
          type="text"
          name="username"
          placeholder="Username"
          className="rounded-5 border-1 text-center py-2"
          ></input>
        </label>

        <label className="form-label">
          <input
          required
          type="password"
          name="password"
          placeholder="Password"
          className="rounded-5 border-1 text-center py-2"
          onChange={e => setPassword(e.target.value)}
          ></input>
        </label>
      <button
        type="submit"
        className="rounded-pill mb-4 btn fw-semibold border border-dark"
        >
        {action}
      </button>
      {(error || (passwordReq && action === "register")) && <div style={{ color: 'red' }}>{error ? `Error: ${error.message}` : passwordReq}</div>}
    </form>
    </div>
  )
};
