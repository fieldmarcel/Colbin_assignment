// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import { getProfile } from '../api/api';

export default function Profile() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;
    getProfile(token)
      .then(setUser)
      .catch(err => console.error('Profile fetch error:', err));
  }, [token]);

  if (!token) return <div>Please log in</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <div style={{ padding: '1rem' }}>
      <h1>{user.firstName} {user.lastName}</h1>
      <p>Email: {user.email}</p>
      <p>Headline: {user.headline}</p>
      <p>Skills: {user.skills.join(', ')}</p>
    </div>
  );
}
