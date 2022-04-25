/* eslint-disable */
import axios from 'axios';
import parse from 'html-react-parser';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Reactions from '../Components/Reactions';
import { BACKEND_ENDPOINT } from '../config.json';
import { useAuth } from '../stores/AuthReducer/Hook';
import { useProduct } from '../stores/ProductReducer/Hook';

function CommentItem(props) {
  const { deleteItemAction, setItemAction } = useProduct();
  const { getUser } = useAuth();
  const { user } = getUser();
  const [showOption, setShowOption] = useState(false);
  const optionHandle = () => {
    setShowOption(!showOption);
  };
  const handleKeyDown = () => {};
  const DeleteHandle = async (postId) => {
    try {
      const Token = JSON.parse(localStorage.getItem('app_user')).accessToken;
      const respone = await axios.get(
        `${BACKEND_ENDPOINT}/api/post/${postId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Token}`,
          },
        },
      );
      await axios.delete(`${BACKEND_ENDPOINT}/api/post/${postId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      });
      deleteItemAction(respone.data.post.id);
      const res = await axios.get(
        `${BACKEND_ENDPOINT}/api/post/${props.parentId}`,
      );
      props.changesetItem(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="relative  flex flex-col items-center justify-around w-full h-full pt-2 bg-white py-2 border-t-4 border-t-neutral-800">
        {props.comment && user && (
          <div>
            {user && props.comment.post.userId === user.id && (
              <div
                className="absolute z-10 w-3 h-3 cursor-pointer top-1 right-1"
                onKeyPress={handleKeyDown}
                role="button"
                tabIndex="0"
                onClick={optionHandle}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </div>
            )}
          </div>
        )}
        {showOption && (
          <div className="absolute top-0 right-0 flex flex-col justify-center w-24 h-10 text-xs translate-x-20 translate-y-5 rounded cursor-pointer bg-neutral-300">
            <ul className="ml-3">
              <li>
                <Link to={`/editcommentform/${props.comment.post.id}`}>
                  <li>edit</li>
                </Link>
              </li>
              <li>
                <span
                  onKeyPress={handleKeyDown}
                  role="button"
                  onClick={() => {
                    DeleteHandle(props.comment.post.id);
                  }}
                >
                  delete
                </span>
              </li>
            </ul>
          </div>
        )}
        <div className="w-11/12 mt-4 ">
          <div className="flex flex-row items-start w-11/12 mt-2">
            <div className="flex flex-row ml-2 text-xs text-slate-400">
              {props.comment && <span> Posted by {props.comment.owner} </span>}
            </div>
          </div>
          <div className="w-11/12 my-5 ">
            <span className="text-sm ">
              {props.comment ? (
                parse(props.comment.post.content)
              ) : (
                <p>no content</p>
              )}
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between w-11/12 bg-white">
          <div className="flex flex-row items-center">
            <div className="my-3 cursor-pointer">
              <Reactions id={props.comment.post.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CommentItem;
