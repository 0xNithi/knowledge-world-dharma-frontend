import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@kwd/ui';

import Box from '../../components/Box';
import Table from '../../components/Table';

function Users() {
  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'col1', // accessor is the "key" in the data
      },
      {
        Header: 'Name',
        accessor: 'col2',
      },
      {
        Header: 'Option',
        maxWidth: 70,
        minWidth: 50,
        width: 60,
        // eslint-disable-next-line
        Cell: ({ row }) => (
          <div className="space-x-2">
            <Link to={`update/${row.original.col1}`}>
              <Button>Update</Button>
            </Link>
            <Button>Delete</Button>
          </div>
        ),
      },
    ],
    [],
  );

  const data = useMemo(
    () => [
      {
        col1: 'Hello',
        col2: 'World',
      },
      {
        col1: 'react-table',
        col2: 'rocks',
      },
      {
        col1: 'whatever',
        col2: 'you want',
      },
      {
        col1: 'Nithi Nomprawat',
        col2: 'you want Hello world',
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
      <Box className="flex flex-col">
        <Table columns={columns} data={data} />
      </Box>
    </>
  );
}

export default Users;
