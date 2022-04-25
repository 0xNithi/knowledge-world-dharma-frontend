import { Button, Input } from '@kwd/ui';
import axios from 'axios';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { BACKEND_ENDPOINT } from '../config.json';
import { useProduct } from '../stores/ProductReducer/Hook';

function PostForm() {
  const { addItemAction } = useProduct();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
  const [title, setTitle] = useState('');
  const [hashtag, setHashtag] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const ref = 0;
    const data = {
      content,
      title,
      hashtag,
      ref,
    };
    try {
      const Token = JSON.parse(localStorage.getItem('app_user')).accessToken;
      const res = await axios.post(
        `${BACKEND_ENDPOINT}/api/post`,
        JSON.stringify(data),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Token}`,
          },
        },
      );
      const { id } = res.data;
      const respone = await axios.get(`${BACKEND_ENDPOINT}/api/post/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      });

      addItemAction(respone.data);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center w-full ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-3/4 mt-20 bg-white rounded-md"
      >
        <Input
          label=""
          placeholder="Title"
          className="!w-11/12 mt-6"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <Input
          label=""
          placeholder="Hashtag"
          className="!w-11/12 mt-2"
          onChange={(e) => {
            setHashtag(e.target.value);
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
          <Button color="primary" size="md" type="submit">
            Button
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
