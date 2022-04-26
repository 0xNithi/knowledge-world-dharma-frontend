import React, { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@kwd/ui';

import Box from '../../components/Box';
import ConfirmModal from '../../components/ConfirmModal';
import Table from '../../components/Table';
import { useUsers, useFetchUsers } from '../../state/users/hook';

function Users() {
  useFetchUsers();

  const { users, handleDelete } = useUsers();

  const [slug, setSlug] = useState(false);

  const handleOpen = useCallback(
    (id) => () => {
      setSlug(id);
    },
    [setSlug],
  );

  const handleClose = useCallback(() => {
    setSlug(false);
  }, [setSlug]);

  const handleSubmit = useCallback(() => {
    handleDelete({ slug });
    handleClose();
  }, [slug, handleClose, handleDelete]);

  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id',
      },
      {
        Header: 'Given name',
        accessor: 'givenName',
      },
      {
        Header: 'Surname',
        accessor: 'surname',
      },
      {
        Header: 'Role',
        accessor: 'role',
      },
      {
        Header: 'Option',
        // eslint-disable-next-line
        Cell: ({ row }) => (
          <div className="space-x-2">
            <Link to={row.original.id.toString()}>
              <Button>Info</Button>
            </Link>
            <Link to={`update/${row.original.id}`}>
              <Button>Update</Button>
            </Link>
            <Button onClick={handleOpen(row.original.id)}>Delete</Button>
          </div>
        ),
      },
    ],
    [handleOpen],
  );

  return (
    <>
      <Box className="flex flex-row justify-between">
        <span className="text-lg font-medium">User</span>
        <Link to="create">
          <Button>Add User</Button>
        </Link>
      </Box>
      <Box className="flex flex-col">
        <Table columns={columns} data={users} />
      </Box>
      {slug && (
        <ConfirmModal
          isOpen={slug !== false}
          onRequestClose={handleClose}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
}

export default Users;
