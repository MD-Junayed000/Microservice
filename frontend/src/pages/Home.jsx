import React from 'react';
import { Navigate } from 'react-router-dom';

export default function Home() {
  // Redirect to login since that's now our landing page
  return <Navigate to="/login" replace />;
} 