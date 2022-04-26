import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Editor } from 'react-draft-wysiwyg';
import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Button, Input } from '@kwd/ui';

import Alert from '../../components/Alert';
import Box from '../../components/Box';
import ConfirmModal from '../../components/ConfirmModal';
import { useThreads } from '../../state/threads/hook';

function ThreadUpdate() {
  const [thread, setThread] = useState();
  const [editorState, setEditorState] = useState();
  const [isOpenHide, setIsOpenHide] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const { isLoading, error, handleView, handleUpdate, handleDelete } =
    useThreads();
  const { slug } = useParams();

  const {
    register,
    handleSubmit,
    formState: { isSubmitted, errors },
    setValue,
  } = useForm();

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

  useEffect(() => {
    setThread(handleView({ slug }));
  }, [slug, handleView]);

  const onSubmit = (data) => {
    setValue('ref', 0);
    handleUpdate({ slug, data });
  };

  useEffect(() => {
    if (isSubmitted && !isLoading && !error) {
      // navigate('/thread');
    }
  }, [isSubmitted, isLoading, error]);

  useEffect(() => {
    if (thread) {
      const blocks = convertFromHTML(thread.post.content);
      const contentState = ContentState.createFromBlockArray(
        blocks.contentBlocks,
        blocks.entityMap,
      );

      if (thread.post.title) {
        setValue('title', thread.post.title);
      }
      if (thread.post.hashTag) {
        setValue('hashTag', thread.post.hashTag);
      }
      if (thread.post.content) {
        setValue('content', thread.post.content);
      }

      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [thread, setValue, setEditorState]);
  return (
    <>
      <Box className="flex flex-row justify-between text-lg font-medium">
        <span>Thread Update</span>
        {!error && (
          <div className="flex flex-row gap-2">
            <Button onClick={handleOpenHide}>
              {thread?.post.hideStatus ? 'Show' : 'Hide'}
            </Button>
            <Button onClick={handleOpenDelete}>Delete</Button>
          </div>
        )}
      </Box>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {thread?.title && (
            <Input
              id="title"
              label="Title"
              type="text"
              placeholder="Title"
              error={errors.title}
              defaultValue={thread?.post.title}
              {...register('title')}
            />
          )}
          {thread?.hashTag && (
            <Input
              id="hashTag"
              label="Hashtag"
              type="text"
              placeholder="Hashtag"
              error={errors.hashTag}
              defaultValue={thread?.post.hashTag}
              {...register('hashTag')}
            />
          )}
          {editorState && (
            <Editor
              defaultEditorState={editorState}
              onEditorStateChange={(state) => {
                setValue(
                  'content',
                  draftToHtml(convertToRaw(state.getCurrentContent())),
                );
              }}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
            />
          )}
          <Button
            color="primary"
            type="submit"
            onClick={handleSubmit}
            className="w-fit"
            disabled={isLoading}
          >
            Submit
          </Button>
          {error && <Alert content={error} />}
        </form>
      </Box>
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

export default ThreadUpdate;
