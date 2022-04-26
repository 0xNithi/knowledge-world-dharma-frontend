import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { Button } from '@kwd/ui';

import { useThreads } from '../../state/threads/hook';

import ConfirmModal from '../ConfirmModal';
import Reactions from '../Reactions';

function CommentItem({ thread }) {
  const [isOpenHide, setIsOpenHide] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const { handleUpdate, handleDelete } = useThreads();

  const handleOpenDelete = useCallback(() => {
    setIsOpenDelete(true);
  }, [setIsOpenDelete]);

  const handleCloseDelete = useCallback(() => {
    setIsOpenDelete(false);
  }, [setIsOpenDelete]);

  const handleConfirmDelete = useCallback(() => {
    handleDelete({ slug: thread.post.id });
    handleCloseDelete();
  }, [thread, handleCloseDelete, handleDelete]);

  const handleOpenHide = useCallback(() => {
    setIsOpenHide(true);
  }, [setIsOpenHide]);

  const handleCloseHide = useCallback(() => {
    setIsOpenHide(false);
  }, [setIsOpenHide]);

  const handleConfirmHide = useCallback(() => {
    handleUpdate({
      slug: thread.post.id,
      data: { hideStatus: thread?.post.hideStatus ? -1 : 1 },
    });
    handleCloseHide();
  }, [thread, handleCloseHide, handleUpdate]);

  return (
    <>
      <div
        className={`flex flex-col gap-2 p-4 rounded-md bg-slate-200 dark:bg-slate-700 ${
          thread?.post.hideStatus ? 'grayscale' : ''
        }`}
      >
        <div className="flex flex-row gap-2">
          <div className="text-xs text-slate-400">
            Comment by {thread.owner}
          </div>
        </div>
        <div className="text-lg">{thread.post.title}</div>
        <div className="text-sm">{parse(thread.post.content)}</div>
        <div className="flex flex-row justify-between">
          <Reactions id={thread.post.id} />
          <div className="flex flex-row gap-2">
            <Button onClick={handleOpenHide}>
              {thread.post.hideStatus ? 'Show' : 'Hide'}
            </Button>
            <Link to={`/thread/update/${thread.post.id}`}>
              <Button>Update</Button>
            </Link>
            <Button onClick={handleOpenDelete}>Delete</Button>
          </div>
        </div>
      </div>
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

export default CommentItem;
