/*eslint-disable*/
import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { BACKEND_ENDPOINT } from '../config.json';
import { useProduct } from '../stores/ProductReducer/Hook';
import Post from './Posts';
import Threaditem from './Threaditem';
import Announcements from '../components/Announcements';

function Home(props) {
  const { setItemAction, getItem } = useProduct();
  const [selectFilter, setSelectFilter] = useState(0);
  const { items } = getItem();
  const GetallPost = async () => {
    const res = await axios.get(`${BACKEND_ENDPOINT}/api/post`);
    setItemAction(res.data);
    console.log(res.data);
  };

  const SearchList = useCallback(() => {
    if (!items) return [];
    return items
      .filter((item) => {
        return item.post.hashTag != null;
      })
      .filter((word) => {
        if (props.searchWord === '') {
          return word;
        } else {
          return word.post.hashTag.includes(props.searchWord);
        }
      })
      .filter((hidstatus) => {
        return hidstatus.post.hideStatus !== true;
      })
      .sort(function (x, y) {
        if (selectFilter === '1') {
          return x.postLikes.length - y.postLikes.length;
        } else if (selectFilter === '2') {
          return x.comments.length - y.comments.length;
        } else {
          return x - y;
        }
      });
  }, [items, selectFilter]);

  useEffect(() => {
    GetallPost();
  }, []);

  return (
    <>
      <div className="flex justify-center w-full mt-20">
        <Announcements />
      </div>
      <Post changeSelectFilterState={(word) => setSelectFilter(word)} />
      {items &&
        SearchList()
          .reverse()
          .map((item) => <Threaditem item={item} />)}
    </>
  );
}

export default Home;
