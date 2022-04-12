import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const LoginPage = React.lazy(() => import('./pages/Login'));

function App() {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<>Loading...</>}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;
