import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@kwd/ui';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center flex-auto h-full space-y-4">
      <span className="text-4xl font-medium">404 Not Found</span>
      <span className="text-xl">Something went wrong.</span>
      <Link to="/">
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
}

export default NotFound;
