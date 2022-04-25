import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input } from '@kwd/ui';

import Alert from '../../components/Alert';
import { useUser } from '../../state/user/hook';

function LoginForm() {
  const { isLoading, error, handleLogin } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    handleLogin({ data });
  };

  return (
    <form
      className="flex flex-col w-full max-w-xs p-4 space-y-2 rounded bg-slate-300 dark:bg-slate-800"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="text-center">Login</div>
      <Input
        id="username"
        label="Username"
        type="text"
        placeholder="Your username"
        error={errors.username}
        {...register('username')}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        placeholder="Your password"
        error={errors.password}
        {...register('password')}
      />
      <Button color="primary" type="submit" disabled={isLoading}>
        Login
      </Button>
      {error && <Alert content={error} />}
    </form>
  );
}

export default LoginForm;
