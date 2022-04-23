import React, { useState } from 'react';
import axios from 'axios';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import { FacebookSelector } from '@charkour/react-reactions';
import { useAuth } from '../stores/AuthReducer/Hook';
import { useProduct } from '../stores/ProductReducer/Hook';

function Threaditem(props) {
  const { deleteItemAction } = useProduct();
  const { getUser } = useAuth();
  const { user } = getUser();
  const [emoji, setEmoji] = useState([]);
  const [showOption, setShowOption] = useState(false);
  const optionHandle = () => {
    setShowOption(!showOption);
  };

  const DeleteHandle = async () => {
    try {
      const Token = JSON.parse(localStorage.getItem('app_user')).accessToken;

      const respone = await axios.get(
        `https://localhost:44342/api/post/${
          props.item.post && props.item.post.id
        }`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Token}`,
          },
        },
      );
      await axios.delete(
        `https://localhost:44342/api/post/${
          props.item.post && props.item.post.id
        }`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Token}`,
          },
        },
      );
      deleteItemAction(respone.data.post.id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = () => {};
  console.log(emoji);
  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="relative flex flex-col items-center w-2/4 my-4 bg-white rounded-md">
        {props.item && user && (
          <div>
            {props.item.post.userId === user.id && (
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
              <Link to={`/editform/${props.item.post && props.item.post.id}`}>
                <li>edit</li>
              </Link>
              <li>
                <span
                  onKeyPress={handleKeyDown}
                  role="button"
                  tabIndex="0"
                  onClick={DeleteHandle}
                >
                  delete
                </span>
              </li>
            </ul>
          </div>
        )}
        <div className="relative flex flex-col items-center w-full overflow-hidden ">
          <div className="flex flex-row items-start w-11/12 mt-2">
            <div className="text-xs font-medium">
              {props.item && props.item.post.hashTag ? (
                `/${props.item.post.hashTag}`
              ) : (
                <span>/general</span>
              )}
            </div>
            <div className="ml-2 text-xs text-slate-400">
              Posted by 5555 5 hours ago
            </div>
          </div>
          <div className="w-11/12 mt-2 ">
            <span className="text-sm ">
              {props.item ? parse(props.item.post.content) : <p>loading...</p>}
            </span>
          </div>
          <div className="absolute bottom-0 w-4/5 h-2 bg-white left-5 opacity-95 blur-sm">
            {}
          </div>
        </div>
        <div className="flex flex-row items-center justify-between w-11/12 bg-white">
          <div className="flex flex-row items-center">
            <div className="w-5/12 my-3 cursor-pointer">
              <FacebookSelector
                reactions={['like']}
                onSelect={(e) => {
                  setEmoji(e);
                }}
              />
            </div>
            <div className="ml-1 text-sm">
              {props.item.postLikes ? (
                props.item.postLikes.length
              ) : (
                <p>loading...</p>
              )}
            </div>
          </div>
          <Link to={`/thredinfo/${props.item.post && props.item.post.id}`}>
            <div className="flex flex-row items-center">
              <span className="mr-1 text-sm">
                {props.item.comments ? (
                  props.item.comments.length
                ) : (
                  <p>loading...</p>
                )}
              </span>
              <span className="text-sm">Comments</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Threaditem;
