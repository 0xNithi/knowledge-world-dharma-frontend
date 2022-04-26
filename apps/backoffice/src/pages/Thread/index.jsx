import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Threads from './Threads';
import ThreadInfo from './ThreadInfo';
import ThreadCreate from './ThreadCreate';
import ThreadUpdate from './ThreadUpdate';

function Thread() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Threads />} />
        <Route path=":slug" element={<ThreadInfo />} />
        <Route path="create" element={<ThreadCreate />} />
        <Route path="update/:slug" element={<ThreadUpdate />} />
      </Route>
    </Routes>
  );
}

export default Thread;
