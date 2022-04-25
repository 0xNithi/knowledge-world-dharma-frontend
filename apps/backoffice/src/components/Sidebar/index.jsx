import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@kwd/ui';

import { links } from './config';
import ThemeSwitch from './ThemeSwitch';

function Sidebar() {
  return (
    <div className="flex flex-col w-64 h-full p-4 border-r bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col space-y-8">
          <div className="flex space-x-2 text-sm">
            <img
              src="https://github.com/mrnithi.png"
              alt="Profile"
              className="object-cover object-center w-12 h-12 rounded"
            />
            <div className="flex flex-col space-y-2">
              <span>Nithi Nomprawat</span>
              <span className="text-slate-500">Admin</span>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            {links.map((link) => (
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `flex space-x-2 py-2 text-sm leading-4 ${
                    isActive
                      ? 'text-slate-800 dark:text-slate-200'
                      : 'text-slate-400 dark:text-slate-400'
                  }`
                }
                key={link.title}
              >
                {link.icon &&
                  React.cloneElement(link.icon, { className: 'w-4 h-4' })}
                <span>{link.title}</span>
              </NavLink>
            ))}
          </div>
        </div>
        <div className="flex justify-between space-x-2">
          <Button className="flex-auto">Logout</Button>
          <ThemeSwitch />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
