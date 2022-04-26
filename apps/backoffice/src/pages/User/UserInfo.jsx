import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@kwd/ui';

import Alert from '../../components/Alert';
import Box from '../../components/Box';
import ConfirmModal from '../../components/ConfirmModal';
import { useUsers } from '../../state/users/hook';

function UserInfo() {
  const [user, setUser] = useState();
  const [isOpenBan, setIsOpenBan] = useState(false);
  const [isOpenAdmin, setIsOpenAdmin] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const { error, handleView, handleDelete, handleBan, handleAdmin } =
    useUsers();
  const { slug } = useParams();

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

  const handleOpenAdmin = useCallback(() => {
    setIsOpenAdmin(true);
  }, [setIsOpenAdmin]);

  const handleCloseAdmin = useCallback(() => {
    setIsOpenAdmin(false);
  }, [setIsOpenAdmin]);

  const handleConfirmAdmin = useCallback(() => {
    handleAdmin({ slug });
    handleCloseAdmin();
  }, [slug, handleCloseAdmin, handleAdmin]);

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

  return (
    <>
      <Box className="flex flex-row justify-between text-lg font-medium">
        <span>User Info</span>
        {!error && (
          <div className="flex flex-row gap-2">
            <Button onClick={handleOpenBan}>
              {user?.banned ? 'Unban' : 'Ban'}
            </Button>
            <Button onClick={handleOpenAdmin}>
              {user?.role.toLowerCase() === 'admin' ? 'Set User' : 'Set Admin'}
            </Button>
            <Link to={`/user/update/${slug}`}>
              <Button>Update</Button>
            </Link>
            <Button onClick={handleOpenDelete}>Delete</Button>
          </div>
        )}
      </Box>
      <Box>
        {error && <Alert content={error} />}
        {!error && user && (
          <div className="relative overflow-x-auto rounded">
            <table className="w-full text-sm text-left table-auto whitespace-nowrap">
              <tbody>
                <tr className="border-b border-slate-200 bg-slate-50 dark:bg-slate-700 dark:border-slate-600">
                  <th className="w-32 p-2 uppercase bg-slate-200 dark:bg-slate-900">
                    Given name:
                  </th>
                  <td className="p-2">{user.givenName ?? '-'}</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50 dark:bg-slate-700 dark:border-slate-600">
                  <th className="p-2 uppercase bg-slate-200 dark:bg-slate-900">
                    Surname:
                  </th>
                  <td className="p-2">{user.surname ?? '-'}</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50 dark:bg-slate-700 dark:border-slate-600">
                  <th className="p-2 uppercase bg-slate-200 dark:bg-slate-900">
                    Email:
                  </th>
                  <td className="p-2">{user.emailAddress ?? '-'}</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50 dark:bg-slate-700 dark:border-slate-600">
                  <th className="p-2 uppercase bg-slate-200 dark:bg-slate-900">
                    Username:
                  </th>
                  <td className="p-2">{user.username ?? '-'}</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50 dark:bg-slate-700 dark:border-slate-600">
                  <th className="p-2 uppercase bg-slate-200 dark:bg-slate-900">
                    Role:
                  </th>
                  <td className="p-2">{user.role ?? '-'}</td>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-700">
                  <th className="p-2 uppercase bg-slate-200 dark:bg-slate-900">
                    Banned:
                  </th>
                  <td className="p-2">{user.banned?.toString() ?? '-'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </Box>
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
      {isOpenAdmin && (
        <ConfirmModal
          isOpen={isOpenAdmin}
          onRequestClose={handleCloseAdmin}
          handleSubmit={handleConfirmAdmin}
          content={`Do you really want to set ${
            user?.role.toLowerCase() === 'admin' ? 'user' : 'admin'
          } role this user?`}
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
    </>
  );
}

export default UserInfo;
