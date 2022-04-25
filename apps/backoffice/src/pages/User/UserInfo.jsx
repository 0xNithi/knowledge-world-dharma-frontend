import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@kwd/ui';

import Alert from '../../components/Alert';
import Box from '../../components/Box';
import ConfirmModal from '../../components/ConfirmModal';
import { useUsers } from '../../state/users/hook';

function UserInfo() {
  const [user, setUser] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const { error, handleView, handleDelete } = useUsers();
  const { slug } = useParams();

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleSubmit = useCallback(() => {
    handleDelete({ slug });
    handleClose();
  }, [slug, handleClose, handleDelete]);

  useEffect(() => {
    setUser(handleView({ slug }));
  }, [slug, handleView]);

  return (
    <>
      <Box className="flex flex-row justify-between text-lg font-medium">
        <span>User Info</span>
        {!error && (
          <div className="flex flex-row gap-2">
            <Link to={`/user/update/${slug}`}>
              <Button>Update</Button>
            </Link>
            <Button>{user?.banned ? 'Unban' : 'Ban'}</Button>
            <Button onClick={handleOpen}>Delete</Button>
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
      {isOpen && (
        <ConfirmModal
          isOpen={isOpen}
          onRequestClose={handleClose}
          handleSubmit={handleSubmit}
          content="Do you really want to delete these records?"
        />
      )}
    </>
  );
}

export default UserInfo;
