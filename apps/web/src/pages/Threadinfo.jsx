/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import parse from 'html-react-parser';
import { useParams, Link } from 'react-router-dom';
import { useModal } from '../stores/ModalReducer/Hook';
import { useAuth } from '../stores/AuthReducer/Hook';
import Comments from './Comments';
import Reactions from '../Components/Reactions';

const EMOJI_COUNTS = {
  pray: 0,
  heart: 0,
  bow: 0,
  smile: 0,
  laugh: 0,
};

function Threadinfo() {
  const { id } = useParams();

  const { showModal } = useModal();
  const [emoji, setEmoji] = useState([]);
  const [emojiCount, setEmojiCount] = useState(EMOJI_COUNTS);
  const [selectedEmoji, setSelectedEmoji] = useState(undefined);
  const { getUser } = useAuth();
  const user = getUser();
  const [item, setItem] = useState(null);

  const GetPost = async () => {
    try {
      const res = await axios.get(`https://localhost:44342/api/post/${id}`);

      setItem(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetPost();
  }, []);

  useEffect(() => {
    if (!item) return;
    const { reacts } = item;

    reacts.forEach((react) => {
      if (react.userId === user.user.id) {
        setSelectedEmoji(react.emoji);
      }
    });
  }, [item]);

  useEffect(() => {
    if (!item) return;
    const { reacts } = item;

    reacts.forEach((react) => {
      if (react.userId === user.user.id) {
        setEmoji([react.emoji]);
      }
    });
  }, [item]);

  // emojiCount
  useEffect(() => {
    if (!item) return;
    const { reacts } = item;
    const newEmojiCount = { ...EMOJI_COUNTS };

    reacts.forEach((react) => {
      newEmojiCount[react.emoji] += 1;
    });

    setEmojiCount(newEmojiCount);
  }, [item]);

  return (
    <div className="flex flex-col items-center w-3/5 h-full mt-20 bg-white rounded-md">
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-row items-start w-11/12 mt-2">
          <div className="text-xs font-medium">
            {item && item.post.hashTag ? (
              `/${item.post.hashTag}`
            ) : (
              <span>/general</span>
            )}
          </div>
          <div className="ml-2 text-xs text-slate-400">
            {item && <span> Posted by </span>}
          </div>
        </div>
        <div className="w-11/12 my-5 ">
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
