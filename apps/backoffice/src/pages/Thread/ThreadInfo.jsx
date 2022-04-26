import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { Button } from '@kwd/ui';

import Alert from '../../components/Alert';
import Box from '../../components/Box';
import Comments from '../../components/Comments';
import ConfirmModal from '../../components/ConfirmModal';
import Reactions from '../../components/Reactions';
import { useAnnouncements } from '../../state/announcements/hook';
import { useThreads } from '../../state/threads/hook';

function ThreadInfo() {
  const [thread, setThread] = useState();
  const [isOpenAnnouncement, setIsOpenAnnouncement] = useState(false);
  const [isOpenHide, setIsOpenHide] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const { handleCreate } = useAnnouncements();
  const { error, handleView, handleUpdate, handleDelete } = useThreads();
  const { slug } = useParams();

  const handleOpenAnnouncement = useCallback(() => {
    setIsOpenAnnouncement(true);
  }, [setIsOpenAnnouncement]);

  const handleCloseAnnouncement = useCallback(() => {
    setIsOpenAnnouncement(false);
  }, [setIsOpenAnnouncement]);

  const handleConfirmAnnouncement = useCallback(() => {
    handleCreate({
      slug,
    });
    handleCloseAnnouncement();
  }, [slug, handleCloseAnnouncement, handleCreate]);

  const handleOpenHide = useCallback(() => {
    setIsOpenHide(true);
  }, [setIsOpenHide]);

  const handleCloseHide = useCallback(() => {
    setIsOpenHide(false);
  }, [setIsOpenHide]);

  const handleConfirmHide = useCallback(() => {
    handleUpdate({
      slug,
      data: { hideStatus: thread?.post.hideStatus ? -1 : 1 },
    });
    handleCloseHide();
  }, [slug, thread, handleCloseHide, handleUpdate]);

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
    setThread(handleView({ slug }));
  }, [slug, handleView]);

  return (
    <>
      <Box className="flex flex-row justify-between text-lg font-medium">
        <span>Thread Info</span>
        {!error && (
          <div className="flex flex-row gap-2">
            <Button onClick={handleOpenAnnouncement}>Announcement</Button>
            <Button onClick={handleOpenHide}>
              {thread?.post.hideStatus ? 'Show' : 'Hide'}
            </Button>
            <Link to={`/thread/update/${slug}`}>
              <Button>Update</Button>
            </Link>
            <Button onClick={handleOpenDelete}>Delete</Button>
          </div>
        )}
      </Box>
      <Box>
        {error && <Alert content={error} />}
        {thread && !error && (
          <div className="flex flex-col gap-2">
            <div
              className={`flex flex-col gap-2 p-4 rounded-md bg-slate-200 dark:bg-slate-700 ${
                thread?.post.hideStatus ? 'grayscale' : ''
              }`}
            >
              <div className="flex flex-row gap-2">
                <div className="px-2 text-xs font-medium text-white bg-green-700 rounded-full">
                  {`/${thread.post.hashTag ?? 'general'}`}
                </div>
                <div className="text-xs text-slate-400">
                  Post by {thread.owner}
                </div>
              </div>
              <div className="text-lg">{thread.post.title}</div>
              <div className="text-sm">{parse(thread.post.content)}</div>
              <div className="flex flex-row justify-between">
                <Reactions id={slug} />
                <div className="flex flex-row items-center">
                  <div className="mr-1 text-sm text-white">
                    {thread.comments.length}
                  </div>
                  <div className="text-sm text-white">comments</div>
                </div>
              </div>
            </div>
            <Comments thread={thread} />
          </div>
        )}
      </Box>
      {isOpenAnnouncement && (
        <ConfirmModal
          isOpen={isOpenAnnouncement}
          onRequestClose={handleCloseAnnouncement}
          handleSubmit={handleConfirmAnnouncement}
          content="Do you really want to announcement these records?"
        />
      )}
      {isOpenHide && (
        <ConfirmModal
          isOpen={isOpenHide}
          onRequestClose={handleCloseHide}
          handleSubmit={handleConfirmHide}
          content={`Do you really want to ${
            thread?.post.hideStatus ? 'show' : 'hide'
          } these records?`}
        />
      )}
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

export default ThreadInfo;
