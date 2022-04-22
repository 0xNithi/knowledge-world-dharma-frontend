import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FacebookSelector } from '@charkour/react-reactions';

function Threaditem({ id }) {
  const [emoji, setEmoji] = useState([]);
  console.log(emoji);
  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="flex flex-col items-center w-2/4 my-4 bg-white rounded-md">
        <div className="relative flex flex-col items-center w-full overflow-hidden h-52">
          <div className="flex flex-row items-start w-11/12 mt-2">
            <div className="text-xs font-medium">r/malefashionadvice</div>
            <div className="ml-2 text-xs text-slate-400">
              Posted by u/aprilmayjune2 5 hours ago
            </div>
          </div>
          <div className="w-11/12 mt-2 ">
            <span className="text-sm ">
              What are some unique aspects about yourself that has made shopping
              for clothes challenging? For example I have arms that are shorter
              than average..but a stocky build. So if I buy off the rack, some
              long sleeve shirt or sweater that fits my body.. the sleeves are
              too long for my arms or.. if I find a shirt or sweater that fits
              my arm length well, its too tight in the body. its lead to some
              extra costs going to the tailor also why i like summer clothes
              more since I dont have to deal with that for short sleeves as
              much. my cousin has a very flat nose bridge, so finding any kind
              of shades, glasses or any other kind of eye wear that can stay up
              very frustrating.
            </span>
          </div>
          <div className="absolute bottom-0 w-4/5 h-5 bg-white left-5 opacity-95 blur-sm">
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
            <div className="ml-1 text-sm">1000</div>
          </div>
          <Link to={`/thredinfo/${id}`}>
            <div className="flex flex-row items-center">
              <span className="mr-1 text-sm">159</span>
              <span className="text-sm">Comments</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Threaditem;
