/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Announce from './Announce';
import { BACKEND_ENDPOINT } from '../../config.json';

function Announcements() {
  const [data, setData] = useState(null);

  const getAnnouncements = async () => {
    const res = await axios.get(`${BACKEND_ENDPOINT}/api/annoucements`);

    setData(res.data);
  };

  useEffect(() => {
    getAnnouncements();
  }, []);

  return (
    <div className="flex flex-col w-full items-center">
      <div className="w-2/4 bg-white rounded-md p-2 text-center">
        ✨ ประกาศจากผู้ดูแล ✨
      </div>
      {data &&
        data.map((announce) => {
          return <Announce admin={announce.admin} post={announce.post} />;
        })}
    </div>
  );
}

export default Announcements;
