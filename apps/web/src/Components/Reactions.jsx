/* eslint-disable */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BACKEND_ENDPOINT } from '../config.json';
import { useAuth } from '../stores/AuthReducer/Hook';

const REACTIONS = [
  {
    type: 'pray',
    emoji: '🙏',
  },
  {
    type: 'heart',
    emoji: '😍',
  },
  {
    type: 'bow',
    emoji: '🙇‍♂️',
  },
  {
    type: 'smile',
    emoji: '😃',
  },
  {
    type: 'laugh',
    emoji: '🤣',
  },
];

const EMOJI_COUNTS = {
  pray: 0,
  heart: 0,
  bow: 0,
  smile: 0,
  laugh: 0,
};

function Reactions({ id }) {
  const [item, setItem] = useState(null);
  const [emojiCount, setEmojiCount] = useState(EMOJI_COUNTS);
  const [selectedEmoji, setSelectedEmoji] = useState(undefined);

  const { getUser } = useAuth();
  const user = getUser();

  const getPost = async () => {
    try {
      const res = await axios.get(`${BACKEND_ENDPOINT}/api/post/${id}`);

      setItem(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReactionUpdate = async (state, oldState) => {
    try {
      setSelectedEmoji(state);
      const Token = JSON.parse(localStorage.getItem('app_user')).accessToken;
      if (state === oldState) {
        await axios.delete(`${BACKEND_ENDPOINT}/api/like/${id}`, {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        });
        setSelectedEmoji('');
      } else if (!oldState) {
        // fetch -> POST /api/likes/
        const data = {
          postId: parseInt(id),
          emoji: state,
          userId: user.user.id,
        };
        await axios.post(`${BACKEND_ENDPOINT}/api/like`, JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Token}`,
          },
        });
        setSelectedEmoji(state);
      } else {
        await axios.delete(`${BACKEND_ENDPOINT}/api/like/${id}`, {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        });
        // fetch -> POST /api/likes/
        const data = {
          postId: parseInt(id),
          emoji: state,
          userId: user.user.id,
        };
        await axios.post(`${BACKEND_ENDPOINT}/api/like`, JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Token}`,
          },
        });
        setSelectedEmoji(state);
      }
    } catch (error) {
      alert(error.message)
    }
    getPost();
  };

  useEffect(() => {
    getPost();
  }, [id]);

  useEffect(() => {
    if (!item || !user.user) return;
    const { reacts } = item;
    setSelectedEmoji(undefined);

    reacts.forEach((react) => {
      if (react.userId === user.user.id) {
        setSelectedEmoji(react.emoji);
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
    <div className="flex space-x-2">
      {REACTIONS.map((react) => {
        return (
          <button
            className={`flex text-sm bg-white rounded-full py-1 px-2 shadow-lg space-x-1 hover:shadow-xl ${
              selectedEmoji === react.type ? 'bg-green-500' : ''
            }`}
            onClick={() => handleReactionUpdate(react.type, selectedEmoji)}
          >
            <p>{emojiCount[react.type]}</p>
            <p>{react.emoji}</p>
          </button>
        );
      })}
      {item && (
        <div className="flex text-sm bg-white rounded-full py-1 px-2 shadow-lg cursor-default">
          {item.reacts.length} คนแสดงความรู้สึก
        </div>
      )}
    </div>
  );
}

export default Reactions;
