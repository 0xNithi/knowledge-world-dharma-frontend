import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import NotFound from '../NotFound';

import Users from './Users';
import UserCreate from './UserCreate';
import UserUpdate from './UserUpdate';

function User() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Users />} />
        <Route path="create" element={<UserCreate />} />
        <Route path="update" element={<Navigate to="/user" />} />
        <Route path="update/:slug" element={<UserUpdate />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default User;
