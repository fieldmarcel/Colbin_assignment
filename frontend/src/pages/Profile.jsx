// src/pages/Profile.jsx (Simplified Version)
import React, { useEffect, useState } from 'react';
import { getProfile } from '../api/api';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    
    getProfile(token)
      .then(setUser)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token]);

  if (!token) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Please log in</h2>
        <a href="/login" className="text-blue-600 hover:text-blue-800">Go to Login</a>
      </div>
    </div>
  );

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mx-auto mb-4">
              {user.firstName?.[0]}{user.lastName?.[0]}
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-gray-600 mt-2">{user.email}</p>
          </div>

          <div className="space-y-6">
            {user.headline && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Headline</h3>
                <p className="text-lg text-gray-900 mt-1">{user.headline}</p>
              </div>
            )}
            
            {user.skills && user.skills.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Skills</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {user.skills.map((skill, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}