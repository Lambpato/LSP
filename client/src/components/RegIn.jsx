import { useState } from "react";
import { RegIn } from '../lib';


export default function RegisterPage ({ action, onSignIn }) {
  const [error, setError] = useState();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { username, password } = Object.fromEntries(formData.entries());
    try {
      const result = await RegIn(action, username, password);

      if (result.user && result.token) onSignIn(result);
    } catch (err) {
      setError(err);
    }
  }


  return (

    <form method="post" onSubmit={handleSubmit}>
      <label className="form-label">
        <input
        required
        type="text"
        name="usename"
        placeholder="Username"
        ></input>
      </label>

      <label className="form-label">
        <div>

        </div>
          <input
        required
        type="password"
        name="password"
        placeholder="Password"
        ></input>
      </label>
      <button
      type="submit"
      className="btn btn-primary">
        {action}
      </button>
      {error && <div style={{ color: 'red' }}>Error: {error.message}</div>}
    </form>
  )
};
