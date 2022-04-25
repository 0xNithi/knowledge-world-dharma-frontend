import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Threads from './Threads';
import ThreadUpdate from './ThreadUpdate';

function Thread() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Threads />} />
        <Route path="update/:slug" element={<ThreadUpdate />} />
      </Route>
    </Routes>
  );
}

export default Thread;
