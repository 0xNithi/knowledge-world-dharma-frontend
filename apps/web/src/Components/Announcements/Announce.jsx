import parse from 'html-react-parser';
import React from 'react';
import { Link } from 'react-router-dom';

function Announcement(props) {
  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="relative flex flex-col items-center w-2/4 my-4 bg-white rounded-lg">
        <div className="relative flex flex-col items-center w-full overflow-hidden ">
          <div className="flex flex-row items-start w-11/12 mt-2">
            <span className="bg-green-700 text-xs font-medium text-white px-2 rounded-full">
              {props.post && props.post.hashTag ? (
                `/${props.post.hashTag}`
              ) : (
                <span>/general</span>
              )}
            </span>
            <div className="ml-2 text-xs text-slate-400">
              ประกาศโดยผู้ดูแล {props.admin}
            </div>
            <div className="ml-auto">
              <span className="mr-2">📌</span>
            </div>
          </div>
          <div className="w-11/12 mt-2 ">
            <span className="text-sm ">
              {props.post ? parse(props.post.content) : <p>loading...</p>}
            </span>
          </div>
          <div className="flex flex-row items-center justify-between w-full h-10 px-1 mt-2 rounded-b-lg bg-slate-700">
            <Link
              className="ml-auto"
              to={`/thredinfo/${props.post && props.post.id}`}
            >
              <span className="ml-auto text-sm text-white underline">
                👉 ดูประกาศ
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Announcement;
