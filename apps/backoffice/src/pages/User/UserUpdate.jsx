import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Input } from '@kwd/ui';

import Box from '../../components/Box';
import ConfirmModal from '../../components/ConfirmModal';
import { useUsers } from '../../state/users/hook';

function UserUpdate() {
  const [user, setUser] = useState(null);
  const [isOpenBan, setIsOpenBan] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const { error, handleView, handleUpdate, handleDelete, handleBan } =
    useUsers();
  const { slug } = useParams();
  const {
    register: registerUpdate,
    handleSubmit: handleSubmitUpdate,
    formState: { errors: errorsUpdate },
    setValue: setValueUpdate,
  } = useForm();
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
  } = useForm();

  const onSubmitUpdate = (data) => {
    handleUpdate({ slug, data });
  };

  const onSubmitPassword = (data) => {
    handleUpdate({ slug, data });
  };

  const handleOpenBan = useCallback(() => {
    setIsOpenBan(true);
  }, [setIsOpenBan]);

  const handleCloseBan = useCallback(() => {
    setIsOpenBan(false);
  }, [setIsOpenBan]);

  const handleConfirmBan = useCallback(() => {
    handleBan({ slug });
    handleCloseBan();
  }, [slug, handleCloseBan, handleBan]);

  const handleOpenDelete = useCallback(() => {
    setIsOpenDelete(true);
  }, [setIsOpenDelete]);

  const handleCloseDelete = useCallback(() => {
    setIsOpenDelete(false);
  }, [setIsOpenDelete]);

  const handleConfirmDelete = useCallback(() => {
    handleDelete({ slug });
    handleCloseDelete();
  }, [slug, handleCloseDelete, handleDelete]);

  useEffect(() => {
    setUser(handleView({ slug }));
  }, [slug, handleView]);

  useEffect(() => {
    if (user) {
      setValueUpdate('givenName', user.givenName);
      setValueUpdate('surname', user.surname);
      setValueUpdate('emailAddress', user.emailAddress);
      setValueUpdate('username', user.username);
    }
  }, [user, setValueUpdate]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col flex-auto gap-2">
        <Box className="flex flex-row justify-between text-lg font-medium">
          <span>User Update</span>
          {!error && (
            <div className="flex flex-row gap-2">
              <Button onClick={handleOpenBan}>
                {user?.banned ? 'Unban' : 'Ban'}
              </Button>
              <Button onClick={handleOpenDelete}>Delete</Button>
            </div>
          )}
        </Box>
        <Box>
          <form
            onSubmit={handleSubmitUpdate(onSubmitUpdate)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-row gap-4">
              <Input
                id="givenName"
                label="Given name"
                type="text"
                placeholder="Given Name"
                containerClassName="flex-auto"
                error={errorsUpdate.givenName}
                {...registerUpdate('givenName')}
              />
              <Input
                id="surname"
                label="Surname"
                type="text"
                placeholder="Surname"
                containerClassName="flex-auto"
                error={errorsUpdate.surname}
                {...registerUpdate('surname')}
              />
            </div>
            <Input
              id="emailAddress"
              label="Email"
              type="email"
              placeholder="Email"
              error={errorsUpdate.emailAddress}
              {...registerUpdate('emailAddress')}
            />
            <Input
              id="username"
              label="Username"
              type="text"
              placeholder="Username"
              error={errorsUpdate.username}
              {...registerUpdate('username')}
            />
            <Button
              color="primary"
              type="submit"
              onClick={handleSubmitUpdate}
              className="max-w-fit"
            >
              Submit
            </Button>
          </form>
        </Box>
      </div>
      <div className="flex flex-col flex-auto gap-2">
        <Box className="flex flex-row justify-between text-lg font-medium">
          <span>Change Password</span>
        </Box>
        <Box>
          <form
            onSubmit={handleSubmitPassword(onSubmitPassword)}
            className="flex flex-col gap-4"
          >
            <Input
              id="password"
              label="Password"
              type="password"
              placeholder="New password"
              error={errorsPassword.password}
              {...registerPassword('password')}
            />
            <Button
              color="primary"
              type="submit"
              onClick={handleSubmitUpdate}
              className="max-w-fit"
            >
              Submit
            </Button>
          </form>
        </Box>
      </div>
      {isOpenBan && (
        <ConfirmModal
          isOpen={isOpenBan}
          onRequestClose={handleCloseBan}
          handleSubmit={handleConfirmBan}
          content={`Do you really want to ${
            user?.banned ? 'unban' : 'ban'
          } this user?`}
        />
      )}
      {isOpenDelete && (
        <ConfirmModal
          isOpen={isOpenDelete}
          onRequestClose={handleCloseDelete}
          handleSubmit={handleConfirmDelete}
          content="Do you really want to delete these records?"
        />
      )}
    </div>
  );
}

export default UserUpdate;
