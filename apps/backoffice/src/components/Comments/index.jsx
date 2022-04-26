import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Button } from '@kwd/ui';

import { useThreads } from '../../state/threads/hook';

import CommentItem from './CommentItem';

function Comments({ thread }) {
  const { handleCreate } = useThreads();
  const { slug } = useParams();

  const { handleSubmit, setValue } = useForm();

  const onSubmit = async (data) => {
    handleCreate({ data });
  };

  useEffect(() => {
    setValue('ref', parseInt(slug, 10));
  }, [slug, setValue]);

  return (
    <>
      <div className="flex flex-col gap-2 p-4 rounded-md bg-slate-200 dark:bg-slate-700">
        <div>Comment</div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <Editor
            onEditorStateChange={(state) => {
              setValue(
                'content',
                draftToHtml(convertToRaw(state.getCurrentContent())),
              );
            }}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class "
            toolbarClassName="toolbar-class"
          />
          <Button color="primary" type="submit" className="w-fit">
            Submit
          </Button>
        </form>
      </div>
      {/* edit comments */}
      {thread &&
        thread.comments.map((comment) => (
          <CommentItem thread={comment} key={comment.post.id} />
        ))}
    </>
  );
}

export default Comments;
