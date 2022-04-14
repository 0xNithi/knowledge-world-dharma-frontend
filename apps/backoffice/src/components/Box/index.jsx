import React from 'react';

function Box({ className, children }) {
  return (
    <div
      className={[
        'p-4 shadow rounded bg-slate-100 dark:bg-slate-800',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}

export default Box;
