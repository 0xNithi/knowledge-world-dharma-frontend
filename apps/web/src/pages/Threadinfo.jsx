import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FacebookSelector } from '@charkour/react-reactions';
import { useModal } from '../stores/ModalReducer/Hook';
import { useAuth } from '../stores/AuthReducer/Hook';

function Threadinfo() {
  const { id } = useParams();
  const { showModal } = useModal();
  const [emoji, setEmoji] = useState([]);
  const { getUser } = useAuth();
  const user = getUser();
  // const setToggleLiked = () => {
  //   setLiked(!liked);
  // };
  // const handleKeyDown = () => {};
  return (
    <div className="flex flex-col items-center w-3/5 h-full mt-20 bg-white rounded-md">
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-row items-start w-11/12 mt-2">
          <div className="text-xs font-medium">r/malefashionadvice</div>
          <div className="ml-2 text-xs text-slate-400">
            Posted by u/aprilmayjune2 5 hours ago
          </div>
        </div>
        <div className="w-11/12 my-5 ">
          <span className="text-sm ">
            What are some unique aspects about yourself that has made shopping
            for clothes challenging? For example I have arms that are shorter
            than average..but a stocky build. So if I buy off the rack, some
            long sleeve shirt or sweater that fits my body.. the sleeves are too
            long for my arms or.. if I find a shirt or sweater that fits my arm
            length well, its too tight in the body. its lead to some extra costs
            going to the tailor also why i like summer clothes more since I dont
            have to deal with that for short sleeves as much. my cousin has a
            very flat nose bridge, so finding any kind of shades, glasses or any
            other kind of eye wear that can stay up very frustrating.
          </span>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between w-11/12 bg-white">
        <div className="flex flex-row items-center">
          <div className="w-4/5 my-3 cursor-pointer">
            {emoji.length === 0 ? (
              <FacebookSelector
                reactions={['like', 'love', 'haha', 'wow', 'sad', 'angry']}
                onSelect={(e) => {
                  if (user.user) {
                    setEmoji(e);
                  } else {
                    showModal();
                  }
                }}
              />
            ) : (
              <div className="w-4/5 ">
                <FacebookSelector
                  reactions={[emoji]}
                  onSelect={() => {
                    if (user.user) {
                      setEmoji([]);
                    } else {
                      showModal();
                    }
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <Link to={`/thredinfo/${id}`}>
          <div className="flex flex-row items-center">
            <span className="mr-1 text-sm">159</span>
            <span className="text-sm">Comments</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Threadinfo;
