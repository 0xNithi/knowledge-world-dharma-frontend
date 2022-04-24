import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { useFetchThreads } from '../../state/threads/hook';

import Threads from './Threads';
import ThreadUpdate from './ThreadUpdate';

function Thread() {
  useFetchThreads();

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
