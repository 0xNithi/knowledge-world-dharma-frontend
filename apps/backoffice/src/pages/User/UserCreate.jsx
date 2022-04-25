import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Input } from '@kwd/ui';

import Box from '../../components/Box';
import { useUsers } from '../../state/users/hook';
import Alert from '../../components/Alert';

function UserCreate() {
  const { isLoading, error, handleCreate } = useUsers();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitted, errors },
  } = useForm();

  const onSubmit = (data) => {
    handleCreate({ data });
  };

  useEffect(() => {
    if (isSubmitted && !isLoading && !error) {
      navigate('/user');
    }
  }, [isSubmitted, isLoading, error, navigate]);

  return (
    <>
      <Box className="text-lg font-medium">User Create</Box>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-row gap-4">
            <Input
              id="givenName"
              label="Given name"
              type="text"
              placeholder="Given Name"
              containerClassName="flex-auto"
              error={errors.givenName}
              {...register('givenName')}
            />
            <Input
              id="surname"
              label="Surname"
              type="text"
              placeholder="Surname"
              containerClassName="flex-auto"
              error={errors.surname}
              {...register('surname')}
            />
          </div>
          <Input
            id="emailAddress"
            label="Email"
            type="email"
            placeholder="Email"
            error={errors.emailAddress}
            {...register('emailAddress')}
          />
          <Input
            id="username"
            label="Username"
            type="text"
            placeholder="Username"
            error={errors.username}
            {...register('username')}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="Password"
            error={errors.password}
            {...register('password')}
          />
          <Button
            color="primary"
            type="submit"
            onClick={handleSubmit}
            className="max-w-fit"
            disabled={isLoading}
          >
            Submit
          </Button>
          {error && <Alert content={error} />}
        </form>
      </Box>
    </>
  );
}

export default UserCreate;
