import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  EditorState,
  ContentState,
  convertFromHTML,
  convertToRaw,
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { Button, Input } from '@kwd/ui';
import { BACKEND_ENDPOINT } from '../config.json';

function EditCommentForm() {
  const { id } = useParams();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
  const [title, setTitle] = useState('comment');
  const [hashtag, setHashtag] = useState('null');
  const [hideStatus, sethideStatus] = useState(0);
  const getPost = useCallback(async () => {
    try {
      const Token = JSON.parse(localStorage.getItem('app_user')).accessToken;
      const res = await axios.get(`${BACKEND_ENDPOINT}/api/post/${id}`, {
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
      sethideStatus(res.data.post.hideStatus);
      setEditorState(EditorState.createWithContent(state));
    } catch (error) {
      console.log(error);
    }
  }, [id]);
  useEffect(() => {
    getPost();
  }, [getPost]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const data = {
      content,
      title,
      hashtag,
      hideStatus: parseInt(hideStatus, 10),
    };
    try {
      const Token = JSON.parse(localStorage.getItem('app_user')).accessToken;
      await axios.put(
        `${BACKEND_ENDPOINT}/api/post/${id}`,
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
  return (
    <div className="flex flex-col items-center w-full ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-3/4 mt-20 bg-white rounded-md"
      >
        <div className="flex flex-col w-full gap-3 mt-4 ml-16 items-left">
          {/* <Input
            label="หัวข้อ"
            placeholder="หัวข้อ"
            value={title}
            className="!w-11/12 "
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          /> */}
          {/* <Input
            label="หมวดหมู่"
            placeholder="หมวดหมู่"
            value={hashtag}
            className="!w-11/12"
            onChange={(e) => {
              setHashtag(e.target.value);
            }}
          /> */}
          <Input
            label="สถานะ"
            placeholder="สถานะ"
            value={hideStatus}
            className="!w-11/12 "
            onChange={(e) => {
              sethideStatus(e.target.value);
            }}
          />
        </div>
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

export default EditCommentForm;
