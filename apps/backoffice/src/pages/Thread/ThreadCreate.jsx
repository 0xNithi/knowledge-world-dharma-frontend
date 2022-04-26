import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Button, Input } from '@kwd/ui';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import Alert from '../../components/Alert';
import Box from '../../components/Box';
import { useThreads } from '../../state/threads/hook';

function ThreadCreate() {
  const { isLoading, error, handleCreate } = useThreads();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitted, errors },
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    handleCreate({ data });
  };

  useEffect(() => {
    if (isSubmitted && !isLoading && !error) {
      navigate('/thread');
    }
  }, [isSubmitted, isLoading, error, navigate]);

  useEffect(() => {
    setValue('ref', 0);
  }, [setValue]);

  return (
    <>
      <Box className="text-lg font-medium">Thread Create</Box>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            id="title"
            label="Title"
            type="text"
            placeholder="Title"
            error={errors.title}
            {...register('title')}
          />
          <Input
            id="hashTag"
            label="Hashtag"
            type="text"
            placeholder="Hashtag"
            error={errors.hashTag}
            {...register('hashTag')}
          />
          <Editor
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
    </>
  );
}

export default ThreadCreate;
