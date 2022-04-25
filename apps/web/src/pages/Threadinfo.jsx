/* eslint-disable */
import axios from 'axios';
import parse from 'html-react-parser';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Reactions from '../Components/Reactions';
import { BACKEND_ENDPOINT } from '../config.json';
import Comments from './Comments';

function Threadinfo() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  const GetPost = async () => {
    try {
      const res = await axios.get(`${BACKEND_ENDPOINT}/api/post/${id}`);

      setItem(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetPost();
  }, []);

  return (
    <div className="flex flex-col items-center w-3/5 h-full mt-20 bg-white rounded-md">
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-row items-start w-11/12 mt-2">
          <div className="px-2 text-xs font-medium text-white bg-green-700 rounded-full">
            {item && item.post.hashTag ? (
              `/${item.post.hashTag}`
            ) : (
              <span>/general</span>
            )}
          </div>
          <div className="ml-2 text-xs text-slate-400">
            {item && <span> Posted by {item ? item.owner : 0}</span>}
          </div>
        </div>
        <div className="flex flex-row items-start w-11/12 mt-2">
          <div className="text-xs font-bold ">
            <span>Title:</span>
            <span className="ml-1 text-slate-400">
              {item ? item.post.title : 0}
            </span>
          </div>
        </div>
        <div className="w-11/12 mt-2 mb-5 ">
          <span className="text-sm ">
            {item ? parse(item.post.content) : <p>no content</p>}
          </span>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between w-11/12 bg-white">
        <div className="flex flex-row items-center">
          <div className="my-3 cursor-pointer">
            <Reactions id={id} />
          </div>
        </div>
        <Link to={`/thredinfo/${id}`}>
          <div className="flex flex-row items-center">
            <span className="mr-1 text-sm">
              {item ? item.comments.length : 0}
            </span>
            <span className="text-sm">Comments</span>
          </div>
        </Link>
      </div>
      <Comments parentId={id} />
    </div>
  );
}

export default Threadinfo;
