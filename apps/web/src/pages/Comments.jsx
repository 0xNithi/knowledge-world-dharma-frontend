/* eslint-disable */
import { Button } from '@kwd/ui';
import axios from 'axios';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import parse from 'html-react-parser';
import React, { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { BACKEND_ENDPOINT } from '../config.json';

function Comments({ parentId }) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
  const [item, setItem] = useState(undefined);
  const GetPost = async () => {
    try {
      const res = await axios.get(`${BACKEND_ENDPOINT}/api/post/${parentId}`);

      setItem(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetPost();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const ref = parentId;
    const data = {
      content,
      ref: parseInt(ref),
    };
    try {
      const Token = JSON.parse(localStorage.getItem('app_user')).accessToken;
      await axios.post(`${BACKEND_ENDPOINT}/api/post`, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="w-full h-full bg-neutral-800 ">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-around w-full h-full pt-2"
        >
          <div className="w-11/12 mt-4 bg-white ">
            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class "
              toolbarClassName="toolbar-class"
            />
          </div>
          <div div className="mt-4 ">
            <Button color="primary" type="submit">
              write
            </Button>
          </div>
        </form>

        {item && (
          <div className="flex flex-col items-center justify-center w-full my-2 bg-neutral-800">
            {console.log('item', item)}
            {item.comments.map((comment) => {
              return (
                <div
                  className="pl-2 mt-1 bg-white rounded "
                  style={{ width: '96%' }}
                >
                  {/* TODO: diff back */}
                  <p>{parse(comment.content)}</p>
                  <p className="text-sm text-gray-400">{comment.owner}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default Comments;
