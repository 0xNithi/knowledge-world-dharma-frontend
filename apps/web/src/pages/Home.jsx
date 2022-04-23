import React, { useEffect } from 'react';
import axios from 'axios';
import { useProduct } from '../stores/ProductReducer/Hook';
import Post from './Posts';

import Threaditem from './Threaditem';

function Home() {
  const { setItemAction, getItem } = useProduct();
  const { items } = getItem();

  const GetallPost = async () => {
    const res = await axios.get('https://localhost:44342/api/post');
    setItemAction(res.data);
  };

  // Wrong! The key should have been specified here:

  useEffect(() => {
    GetallPost();
  }, []);

  return (
    <>
      <Post />
      {items && items.map((item) => <Threaditem item={item} />)}
    </>
  );
}

export default Home;
