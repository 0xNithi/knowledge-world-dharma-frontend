import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Threads from './Threads';
import ThreadInfo from './ThreadInfo';

function Thread() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Threads />} />
        <Route path=":slug" element={<ThreadInfo />} />
      </Route>
    </Routes>
  );
}

export default Thread;
