import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function Breadcumb() {
  const location = useLocation();
  return (
    <div className="flex flex-row space-x-2 text-slate-400">
      {['Home', ...location.pathname.split('/')].reduce((prev, curr, index) => {
        if (curr) {
          return (
            <>
              {prev}
              {index > 0 && <span>/</span>}
              <NavLink
                to={index > 0 ? curr : '/'}
                className={({ isActive }) =>
                  `capitalize${
                    isActive && ' !text-slate-800 dark:!text-slate-200'
                  }`
                }
              >
                {curr}
              </NavLink>
            </>
          );
        }
        return prev;
      }, [])}
    </div>
  );
}

export default Breadcumb;
