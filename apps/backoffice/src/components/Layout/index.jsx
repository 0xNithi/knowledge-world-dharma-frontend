import React from 'react';
import { Outlet } from 'react-router-dom';
import Breadcumb from '../Breadcumb';

import Sidebar from '../Sidebar';

function Layout() {
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex flex-col w-full gap-4 p-4 ml-64">
        <Breadcumb />
        <div className="flex flex-col flex-auto gap-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
