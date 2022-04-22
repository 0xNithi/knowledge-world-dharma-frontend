import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { Button, Input } from '@kwd/ui';
import { useProduct } from '../stores/ProductReducer/Hook';

function PostForm() {
  const { addItemAction } = useProduct();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const datapost = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    addItemAction({ title, datapost });
  };

  return (
    <div className="flex flex-col items-center w-full ">
      <div className="flex flex-col items-center w-3/4 mt-20 bg-white rounded-md">
        <Input
          label=""
          placeholder="Title"
          className="!w-11/12 mt-6"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <div className="w-11/12 mt-4">
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
          />
        </div>
        <div className="my-3">
          <Button color="primary" size="md" onClick={handleSubmit}>
            Button
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PostForm;
