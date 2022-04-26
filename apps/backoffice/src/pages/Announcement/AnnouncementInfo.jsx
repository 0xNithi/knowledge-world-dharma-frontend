import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { Button } from '@kwd/ui';

import Alert from '../../components/Alert';
import Box from '../../components/Box';
import ConfirmModal from '../../components/ConfirmModal';
import { useAnnouncements } from '../../state/announcements/hook';

function AnouncementInfo() {
  const [announcement, setAnnouncement] = useState();
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const { error, handleView, handleDelete } = useAnnouncements();
  const { slug } = useParams();

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
    setAnnouncement(handleView({ slug }));
  }, [slug, handleView]);

  return (
    <>
      <Box className="flex flex-row justify-between text-lg font-medium">
        <span>Announcement Info</span>
        {!error && <Button onClick={handleOpenDelete}>Delete</Button>}
      </Box>
      <Box>
        {error && <Alert content={error} />}
        {announcement && !error && (
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 p-4 rounded-md bg-slate-200 dark:bg-slate-700">
              <div className="flex flex-row gap-2">
                <div className="px-2 text-xs font-medium text-white bg-green-700 rounded-full">
                  {`/${announcement.post.hashTag ?? 'general'}`}
                </div>
                <div className="text-xs text-slate-400">
                  Post by admin {announcement.admin}
                </div>
              </div>
              <div className="text-lg">{announcement.post.title}</div>
              <div className="text-sm">{parse(announcement.post.content)}</div>
            </div>
          </div>
        )}
      </Box>
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

export default AnouncementInfo;
