import React, { useState } from 'react';
import axios from 'axios';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import { useAuth } from '../stores/AuthReducer/Hook';
import { useProduct } from '../stores/ProductReducer/Hook';
import Reactions from '../Components/Reactions';
import { BACKEND_ENDPOINT } from '../config.json';

function Threaditem(props) {
  const { deleteItemAction } = useProduct();
  const { getUser } = useAuth();
  const { user } = getUser();
  const [showOption, setShowOption] = useState(false);
  const optionHandle = () => {
    setShowOption(!showOption);
  };

  const DeleteHandle = async () => {
    try {
      const Token = JSON.parse(localStorage.getItem('app_user')).accessToken;

      const respone = await axios.get(
        `${BACKEND_ENDPOINT}/api/post/${props.item.post && props.item.post.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Token}`,
          },
        },
      );
      await axios.delete(
        `${BACKEND_ENDPOINT}/api/post/${props.item.post && props.item.post.id}`,
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
  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="relative flex flex-col items-center w-2/4 my-4 bg-white rounded-lg">
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
            <span className="bg-green-700 text-xs font-medium text-white px-2 rounded-full">
              {props.item && props.item.post.hashTag ? (
                `/${props.item.post.hashTag}`
              ) : (
                <span>/general</span>
              )}
            </span>
            <div className="ml-2 text-xs text-slate-400">
              Posted by {props.item.owner}
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
        <div className="flex flex-row items-center justify-between w-full h-10 px-1 mt-2 rounded-b-lg bg-slate-700">
          <div className="flex flex-row items-center">
            <div className="my-3 cursor-pointer">
              <Reactions id={props.item.post.id} />
            </div>
            {/* <div className="ml-1 text-sm text-white">
              {props.item.postLikes ? (
                props.item.postLikes.length
              ) : (
                <p>loading...</p>
              )}
            </div> */}
          </div>
          <Link to={`/thredinfo/${props.item.post && props.item.post.id}`}>
            <div className="flex flex-row items-center">
              <span className="mr-1 text-sm text-white">
                {props.item.comments ? (
                  props.item.comments.length
                ) : (
                  <p>loading...</p>
                )}
              </span>
              <span className="text-sm text-white">Comments</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Threaditem;
