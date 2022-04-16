import React from 'react';
import { Outlet } from 'react-router-dom';
import Breadcumb from '../Breadcumb';

import Sidebar from '../Sidebar';

function Layout() {
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex flex-col w-full p-4 space-y-4">
        <Breadcumb />
        <div className="flex flex-col flex-auto space-y-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
