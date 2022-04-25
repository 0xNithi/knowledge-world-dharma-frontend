import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@kwd/ui';

import Box from '../../components/Box';
import ConfirmModal from '../../components/ConfirmModal';
import { useThreads } from '../../state/threads/hook';

function ThreadUpdate() {
  const [thread, setThread] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const { error, handleView, handleDelete } = useThreads();
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
    setThread(handleView({ slug }));
  }, [slug, handleView]);

  return (
    <>
      <Box className="flex flex-row justify-between text-lg font-medium">
        <span>Thread Update</span>
        {!error && <Button onClick={handleOpen}>Delete</Button>}
      </Box>
      <Box>
        {JSON.stringify(error)}
        {JSON.stringify(thread)}
      </Box>
      {isOpen && (
        <ConfirmModal
          isOpen={isOpen}
          onRequestClose={handleClose}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
}

export default ThreadUpdate;
