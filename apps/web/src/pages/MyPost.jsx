/*eslint-disable*/
import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { BACKEND_ENDPOINT } from '../config.json';
import { useProduct } from '../stores/ProductReducer/Hook';
import Post from './Posts';
import Threaditem from './Threaditem';
import { useAuth } from '../stores/AuthReducer/Hook';
function MyPost(props) {
  const { setItemAction, getItem } = useProduct();
  const [selectFilter, setSelectFilter] = useState(0);
  const { items } = getItem();
  const GetallPost = async () => {
    const res = await axios.get(`${BACKEND_ENDPOINT}/api/post`);
    setItemAction(res.data);
  };

  const SearchList = useCallback(() => {
    if (!items) return [];
    return items
      .filter((item) => {
        const { getUser } = useAuth();

        const user = getUser();
        return item.post.userId === user.user.id;
      })
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
      .sort(function (x, y) {
        if (selectFilter === '1') {
          return x.postLikes.length - y.postLikes.length;
        } else if (selectFilter === '2') {
          return x.comments.length - y.comments.length;
        } else {
          return x - y;
        }
      });
  }, [items, selectFilter, props.searchWord]);

  useEffect(() => {
    GetallPost();
  }, []);

  return (
    <>
      <div className="mt-20 w-full flex justify-center"></div>
      <Post changeSelectFilterState={(word) => setSelectFilter(word)} />
      {items &&
        SearchList()
          .reverse()
          .map((item) => <Threaditem item={item} />)}
    </>
  );
}

export default MyPost;
