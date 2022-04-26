import React, { useEffect, useState } from 'react';
import LikeAPI from '../../api/like';

import ThreadAPI from '../../api/thread';
import { useUser } from '../../state/user/hook';

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

  const { user, accessToken } = useUser();

  const getPost = async () => {
    try {
      const res = await ThreadAPI.get({ slug: id });
      setItem(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReactionUpdate = async (state, oldState) => {
    try {
      setSelectedEmoji(state);
      if (state === oldState) {
        await LikeAPI.unlike({ slug: id, accessToken });
        setSelectedEmoji('');
      } else if (!oldState) {
        // fetch -> POST /api/likes/
        const data = {
          postId: parseInt(id, 10),
          emoji: state,
          userId: user.id,
        };
        await LikeAPI.like({ accessToken, data });
        setSelectedEmoji(state);
      } else {
        await LikeAPI.unlike({ slug: id, accessToken });
        // fetch -> POST /api/likes/
        const data = {
          postId: parseInt(id, 10),
          emoji: state,
          userId: user.id,
        };
        await LikeAPI.like({ accessToken, data });
        setSelectedEmoji(state);
      }
    } catch (error) {
      alert(error.message);
    }
    getPost();
  };

  useEffect(() => {
    getPost();
  }, [id]);

  useEffect(() => {
    if (!item || !user) return;
    const { reacts } = item;
    setSelectedEmoji(undefined);

    reacts.forEach((react) => {
      if (react.userId === user.id) {
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
    <div className="flex flex-row gap-2">
      {REACTIONS.map((react) => (
        <button
          type="button"
          className={`flex text-sm bg-white dark:bg-slate-600 rounded-full py-1 px-2 space-x-1 hover:bg-slate-100 ${
            selectedEmoji === react.type
              ? '!bg-green-300 dark:!bg-green-500'
              : ''
          }`}
          onClick={() => handleReactionUpdate(react.type, selectedEmoji)}
        >
          <p>{emojiCount[react.type]}</p>
          <p>{react.emoji}</p>
        </button>
      ))}
      {item && (
        <div className="flex px-2 py-1 text-sm bg-white rounded-full cursor-default dark:bg-slate-600">
          {item.reacts.length} reactions
        </div>
      )}
    </div>
  );
}

export default Reactions;
