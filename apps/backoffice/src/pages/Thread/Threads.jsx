import React, { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@kwd/ui';

import Box from '../../components/Box';
import Table from '../../components/Table';
import { useFetchThreads, useThreads } from '../../state/threads/hook';
import ConfirmModal from '../../components/ConfirmModal';

function Threads() {
  useFetchThreads();

  const { threads, handleDelete } = useThreads();

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
    handleDelete({
      slug,
    });
    handleClose();
  }, [slug, handleClose, handleDelete]);

  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: ({ post }) => post.id,
        id: 'id',
      },
      {
        Header: 'Title',
        accessor: ({ post }) => post.title ?? '-',
        id: 'title',
      },
      {
        Header: 'Status',
        accessor: ({ post }) => {
          if (post.hideStatus) {
            return 'hide';
          }
          return 'visible';
        },
        id: 'status',
      },
      {
        Header: 'Option',
        // eslint-disable-next-line
        Cell: ({ row }) => (
          <div className="space-x-2">
            <Link to={row.original.post.id.toString()}>
              <Button>Info</Button>
            </Link>
            <Link to={`update/${row.original.post.id}`}>
              <Button>Update</Button>
            </Link>
            <Button onClick={handleOpen(row.original.post.id.toString())}>
              Delete
            </Button>
          </div>
        ),
      },
    ],
    [handleOpen],
  );

  return (
    <>
      <Box className="flex flex-row justify-between">
        <span className="text-lg font-medium">Thread</span>
        <Link to="create">
          <Button>Add Thread</Button>
        </Link>
      </Box>
      <Box className="flex flex-col">
        <Table columns={columns} data={threads} />
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

export default Threads;
