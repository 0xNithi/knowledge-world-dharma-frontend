import React, { useMemo } from 'react';
import { Button } from '@kwd/ui';

import Box from '../../components/Box';
import Table from '../../components/Table';

function Thread() {
  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'col1', // accessor is the "key" in the data
      },
      {
        Header: 'Title',
        accessor: 'col2',
      },
      {
        Header: 'Option',
        // eslint-disable-next-line
        Cell: () => (
          <div className="space-x-2">
            <Button>Info</Button>
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
    <div className="flex flex-col space-y-2">
      <Box className="text-lg font-medium">Thread</Box>
      <Box className="flex flex-col">
        <Table columns={columns} data={data} />
      </Box>
    </div>
  );
}

export default Thread;
