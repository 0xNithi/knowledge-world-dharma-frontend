import React from 'react';
import { Button, Input } from '@kwd/ui';

function LoginForm() {
  return (
    <div className="flex flex-col w-full max-w-xs p-4 space-y-2 rounded bg-slate-300">
      <div className="text-center">Login</div>
      <Input id="email" label="Email" type="email" placeholder="Your email" />
      <Input
        id="password"
        label="Password"
        type="password"
        placeholder="Your password"
      />
      <Button color="primary">Login</Button>
    </div>
  );
}

export default LoginForm;
