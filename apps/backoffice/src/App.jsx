import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectRoute';
import { useFetchUser } from './state/user/hook';

const OverviewPage = React.lazy(() => import('./pages/Overview'));
const AnouncementPage = React.lazy(() => import('./pages/Anouncement'));
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
              isAllowed={!!user && user.role.toLowerCase() === 'admin'}
            >
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <React.Suspense fallback={<>Loading...</>}>
                <OverviewPage />
              </React.Suspense>
            }
          />
          <Route
            path="anouncement/*"
            element={
              <React.Suspense fallback={<>Loading...</>}>
                <AnouncementPage />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
