// src/pages/Register.jsx
import React, { useState } from 'react';

export default function Register() {
  const [form, setForm] = useState({
    email: '', password: '', firstName: '', lastName: ''
  });
  const [msg, setMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/auth/register`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form),
});

      const data = await res.json();
      if (!res.ok) throw data;
      setMsg('Registration successful! You can now login.');
    } catch (err) {
      setMsg(err.error || 'Registration failed');
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: '1rem' }}>
      <h2>Register</h2>
      {msg && <p>{msg}</p>}
      <input placeholder="First Name"
        value={form.firstName}
        onChange={e => setForm({ ...form, firstName: e.target.value })} /><br/>
      <input placeholder="Last Name"
        value={form.lastName}
        onChange={e => setForm({ ...form, lastName: e.target.value })} /><br/>
      <input type="email" placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })} /><br/>
      <input type="password" placeholder="Password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })} /><br/>
      <button type="submit">Sign Up</button>
    </form>
  );
}
