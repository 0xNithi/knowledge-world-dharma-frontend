import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
// , convertToRaw
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import draftToHtml from 'draftjs-to-html';
import { Button, Input } from '@kwd/ui';

function EditForm() {
  const { id } = useParams();
  console.log(id);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
  const [title, setTitle] = useState('');
  const [hashtag, setHashtag] = useState('');
  const [hideStatus, sethideStatus] = useState(0);
  const getPost = async () => {
    try {
      const Token = JSON.parse(localStorage.getItem('app_user')).accessToken;
      const res = await axios.get(`https://localhost:44342/api/post/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      });
      const blocksFromHTML = convertFromHTML(res.data.post.content);
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap,
      );
      setTitle(res.data.post.title);
      setHashtag(res.data.post.hashTag);
      setHashtag(res.data.post.hideStatus);
      setEditorState(EditorState.createWithContent(state));

      const data = {
        title,
        hashtag,
        hideStatus,
      };
      await axios.put(
        `https://localhost:44342/api/post/${id}`,
        JSON.stringify(data),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Token}`,
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPost();
  }, []);
  const handleSubmit = () => {};
  return (
    <div className="flex flex-col items-center w-full ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-3/4 mt-20 bg-white rounded-md"
      >
        <Input
          label=""
          placeholder="Title"
          value={title}
          className="!w-11/12 mt-6"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <Input
          label=""
          placeholder="Hashtag"
          value={hashtag}
          className="!w-11/12 mt-2"
          onChange={(e) => {
            setHashtag(e.target.value);
          }}
        />
        <Input
          label=""
          placeholder="HideStatus"
          value={hideStatus}
          className="!w-11/12 mt-2"
          onChange={(e) => {
            sethideStatus(e.target.value);
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
            Edit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditForm;
