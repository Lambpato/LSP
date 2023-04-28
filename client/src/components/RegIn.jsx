import { useState } from "react";
import { RegIn } from '../lib';
import { useNavigate } from 'react-router-dom';


export default function RegisterPage ({ action, onSignIn }) {
  const navigate = useNavigate();
  const [error, setError] = useState();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { username, password } = Object.fromEntries(formData.entries());
    try {
      const result = await RegIn(action, username, password);
      if (action === 'register') { navigate('/log-in') }
      else if(result.user && result.token) onSignIn(result);
    } catch (err) {
      setError(err);
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
          placeholder="👤 Username"
          className="rounded-5 border-1 text-center py-2"
          ></input>
        </label>

        <label className="form-label">
          <input
          required
          type="password"
          name="password"
          placeholder="🔑 Password"
          className="rounded-5 border-1 text-center py-2"
          ></input>
        </label>

      <button
        type="submit"
        className="rounded-pill mb-4 btn fw-semibold border border-dark"
        >
        {action}
      </button>

      {error && <div style={{ color: 'red' }}>Error: {error.message}</div>}
    </form>
    </div>

  )
};
