export async function logIn(username, password) {
  return await regIn('log-in', username, password);
}

export async function register(username, password) {
  return await regIn('register', username, password);
}

export async function regIn(action, username, password) {
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  };
  const res = await fetch(`/api/users/${action}`, req);
  if (!res.ok) throw new Error(`Error: ${res.status}`);
  return await res.json();
}
