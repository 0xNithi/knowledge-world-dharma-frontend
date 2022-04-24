import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import NotFound from '../NotFound';

import Anouncements from './Anouncements';
import AnouncementInfo from './AnouncementInfo';
import AnouncementCreate from './AnouncementCreate';
import AnouncementUpdate from './AnouncementUpdate';

function Anouncement() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Anouncements />} />
        <Route path=":slug" element={<AnouncementInfo />} />
        <Route path="create" element={<AnouncementCreate />} />
        <Route path="update" element={<Navigate to="/anouncement" />} />
        <Route path="update/:slug" element={<AnouncementUpdate />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default Anouncement;
