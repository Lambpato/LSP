const url = (path) => `${process.env.REACT_APP_BASE_URL}${path}`;

export async function logIn(username, password) {
  return await RegIn('log-in', username, password);
}

export async function register(username, password) {
  return await RegIn('register', username, password);
}

export async function RegIn(action, username, password) {
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  };
  const res = await fetch(url(`/api/users/${action}`), req)
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}
