import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@kwd/ui';

import Box from '../../components/Box';
import Table from '../../components/Table';
import { useThreads } from '../../state/threads/hook';

function Threads() {
  const { threads, error, handleDelete } = useThreads();

  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: ({ post }) => post.id,
        id: 'id',
      },
      {
        Header: 'Title',
        accessor: ({ post }) => post.title,
        id: 'title',
      },
      {
        Header: 'Status',
        accessor: ({ post }) => {
          const hide = post.hideStatus;

          if (hide === -1) {
            return 'visible';
          }
          if (hide === 0) {
            return 'visible';
          }
          if (hide === 1) {
            return 'hide';
          }

          return 'error';
        },
        id: 'status',
      },
      {
        Header: 'Option',
        // eslint-disable-next-line
        Cell: ({ row }) => (
          <div className="space-x-2">
            <Link to={`update/${row.original.post.id.toString()}`}>
              <Button>Update</Button>
            </Link>
            <Button
              onClick={() =>
                handleDelete({ slug: row.original.post.id.toString() })
              }
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    [handleDelete],
  );

  return (
    <>
      <Box className="text-lg font-medium">Thread</Box>
      {error && <Box>{error}</Box>}
      <Box className="flex flex-col">
        <Table columns={columns} data={threads} />
      </Box>
    </>
  );
}

export default Threads;
