/* eslint-disable */
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

function EditForm() {
  const { id } = useParams();
  console.log(id);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
  const [title, setTitle] = useState('');
  const [hashtag, setHashtag] = useState('');
  const [HideStatus, sethideStatus] = useState(false);
  const [allPost, setAllPost] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAllPost = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BACKEND_ENDPOINT}/api/post`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.data) {
        const array = [];
        const arrayList = [];
        for (let index = 0; index < res.data.length; ) {
          if (res.data[index].post.hashTag !== array) {
            array.push(res.data[index].post.hashTag);
          }
          index += 1;
        }
        const uniqueChars = [...new Set(array)];
        console.log(uniqueChars);
        setAllPost(uniqueChars);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getPost = useCallback(async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    let hideStatus = 0;
    if (HideStatus === true) {
      hideStatus = 1;
    } else {
      hideStatus = -1;
    }
    console.log(hideStatus);
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
  useEffect(() => {
    getPost();
  }, [getPost]);
  useEffect(() => {
    getAllPost();
  }, [getAllPost]);
  useEffect(() => {
    console.log(HideStatus);
  }, [HideStatus]);
  return (
    <div className="flex flex-col items-center w-full ">
      {!loading && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center w-3/4 mt-20 bg-white rounded-md"
        >
          <div className="flex flex-col w-full gap-3 mt-4 ml-16 items-left">
            <Input
              label="หัวข้อ"
              placeholder="หัวข้อ"
              value={title}
              className="!w-1/2 "
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <div className="flex flex-row justify-between w-1/2 gap-10 item-center">
              <div className="flex flex-col items-left">
                <span>หมวดหมู่</span>
                <div className="flex mt-2">
                  <div className="mb-3 xl:w-80">
                    <select
                      onChange={(e) => {
                        setHashtag(e.target.value);
                      }}
                      className="block w-full px-3 py-0.5 m-0 text-base font-normal text-gray-700 transition ease-in-out bg-white bg-no-repeat border border-gray-400 border-solid rounded-md appearance-none  bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      aria-label="Default select example"
                    >
                      <option value={hashtag} selected disabled hidden>
                        {hashtag}
                      </option>
                      {allPost &&
                        allPost
                          .filter((nullword) => {
                            return nullword != null;
                          })
                          .map((hashtagWord) => (
                            <option value={hashtagWord}>{hashtagWord}</option>
                          ))}
                    </select>
                  </div>
                </div>
              </div>
              {!loading && (
                <div className="flex flex-col mt-1 items-left">
                  <span>สถานะ</span>
                  <label htmlFor="toggle-switch" className="mt-2">
                    <input
                      type="checkbox"
                      id="toggle-switch"
                      checked={HideStatus}
                      className="relative w-12 h-6 rounded-full appearance-none bg-slate-400"
                      onChange={(e) => {
                        sethideStatus(e.target.checked);
                      }}
                    />
                  </label>
                </div>
              )}
            </div>
          </div>
          <div className="w-11/12 mt-4">
            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
              wrapperclassName="wrapper-class"
              editorclassName="editor-class"
              toolbarclassName="toolbar-class"
            />
          </div>
          <div className="my-3">
            <Button color="primary" size="md" type="submit">
              Edit
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default EditForm;
