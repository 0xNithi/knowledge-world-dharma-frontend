/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useProduct } from '../stores/ProductReducer/Hook';
import Post from './Posts';

import Threaditem from './Threaditem';

function Home(props) {
  const { setItemAction, getItem } = useProduct();
  const [selectFilter, setSelectFilter] = useState(0);
  const { items } = getItem();
  const GetallPost = async () => {
    const res = await axios.get('https://localhost:44342/api/post');
    setItemAction(res.data);
  };
  const SearchList = items
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
  console.log(selectFilter);
  useEffect(() => {
    GetallPost();
  }, []);

  return (
    <>
      <Post changeSelectFilterState={(word) => setSelectFilter(word)} />
      {items && SearchList.map((item) => <Threaditem item={item} />)}
    </>
  );
}

export default Home;
