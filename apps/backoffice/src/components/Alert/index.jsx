import React from 'react';

function Alert({ content }) {
  return (
    <div className="px-2 py-1.5 text-sm text-red-400 rounded bg-red-50">
      * {content}
    </div>
  );
}

export default Alert;
