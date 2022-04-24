import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function Breadcumb() {
  const location = useLocation();
  const paths = [
    'Home',
    ...location.pathname.split('/').reduce((prev, curr) => {
      if (curr) {
        prev.push(`${prev.slice(-1)}/${curr}`);
      }
      return prev;
    }, []),
  ];
  return (
    <div className="flex flex-row space-x-2 text-slate-400">
      {paths.map((item, index) => {
        return (
          <div className="space-x-2" key={item}>
            {index > 0 && <span>/</span>}
            <NavLink
              end
              to={index > 0 ? item : '/'}
              className={({ isActive }) =>
                `capitalize${
                  isActive ? ' !text-slate-800 dark:!text-slate-200' : ''
                }`
              }
            >
              {index !== 0
                ? decodeURI(item).split('/').slice(-1).toString()
                : item}
            </NavLink>
          </div>
        );
      })}
    </div>
  );
}

export default Breadcumb;
