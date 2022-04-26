import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectRoute';
import NotFound from './pages/NotFound';
import { useFetchUser } from './state/user/hook';

const AnnouncementPage = React.lazy(() => import('./pages/Announcement'));
const ThreadPage = React.lazy(() => import('./pages/Thread'));
const UserPage = React.lazy(() => import('./pages/User'));
const LoginPage = React.lazy(() => import('./pages/Login'));

function App() {
  const { user } = useFetchUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              isAllowed={Boolean(user) && user.role.toLowerCase() === 'admin'}
            >
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="announcement" />} />
          <Route
            path="announcement/*"
            element={
              <React.Suspense fallback={<>Loading...</>}>
                <AnnouncementPage />
              </React.Suspense>
            }
          />
          <Route
            path="thread/*"
            element={
              <React.Suspense fallback={<>Loading...</>}>
                <ThreadPage />
              </React.Suspense>
            }
          />
          <Route
            path="user/*"
            element={
              <React.Suspense fallback={<>Loading...</>}>
                <UserPage />
              </React.Suspense>
            }
          />
        </Route>
        <Route
          path="/login"
          element={
            <ProtectedRoute
              isAllowed={!user || user.role.toLowerCase() !== 'admin'}
              redirectPath="/"
            >
              <React.Suspense fallback={<>Loading...</>}>
                <LoginPage />
              </React.Suspense>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
