import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import { useFetchUser } from './state/user/hook';

const OverviewPage = React.lazy(() => import('./pages/Overview'));
const AnouncementPage = React.lazy(() => import('./pages/Anouncement'));
const ThreadPage = React.lazy(() => import('./pages/Thread'));
const UserPage = React.lazy(() => import('./pages/User'));
const LoginPage = React.lazy(() => import('./pages/Login'));

function App() {
  useFetchUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
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
            <React.Suspense fallback={<>Loading...</>}>
              <LoginPage />
            </React.Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
