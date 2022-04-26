import React, { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@kwd/ui';

import Box from '../../components/Box';
import ConfirmModal from '../../components/ConfirmModal';
import Table from '../../components/Table';
import {
  useAnnouncements,
  useFetchAnnouncements,
} from '../../state/announcements/hook';

function Anouncements() {
  useFetchAnnouncements();

  const { announcements, handleDelete } = useAnnouncements();

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
        accessor: ({ id }) => id,
        id: 'id',
      },
      {
        Header: 'Title',
        accessor: ({ post }) => post.title ?? '-',
        id: 'title',
      },
      {
        Header: 'Option',
        maxWidth: 70,
        minWidth: 50,
        width: 60,
        // eslint-disable-next-line
        Cell: ({ row }) => (
          <div className="space-x-2">
            <Link to={row.original.id.toString()}>
              <Button>Info</Button>
            </Link>
            <Button onClick={handleOpen(row.original.id.toString())}>
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
        <span className="text-lg font-medium">Anouncements</span>
      </Box>
      <Box className="flex flex-col">
        <Table columns={columns} data={announcements} />
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

export default Anouncements;
