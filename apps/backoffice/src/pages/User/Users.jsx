import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@kwd/ui';

import Box from '../../components/Box';
import Table from '../../components/Table';
import { useUsers } from '../../state/users/hook';

function Users() {
  const { users, error } = useUsers();

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
            <Link to={`update/${row.original.id.toString()}`}>
              <Button>Update</Button>
            </Link>
            <Button>Delete</Button>
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <>
      <Box className="flex flex-row justify-between">
        <span className="text-lg font-medium">User</span>
        <Link to="create">
          <Button>Add User</Button>
        </Link>
      </Box>
      {error && <Box>{error}</Box>}
      <Box className="flex flex-col">
        <Table columns={columns} data={users} />
      </Box>
    </>
  );
}

export default Users;
