import React from 'react';
import { Routes, Route } from 'react-router-dom';

import NotFound from '../NotFound';

import Announcements from './Announcements';
import AnnouncementInfo from './AnnouncementInfo';

function Announcement() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Announcements />} />
        <Route path=":slug" element={<AnnouncementInfo />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default Announcement;
