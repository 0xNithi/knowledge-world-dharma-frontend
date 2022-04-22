import React from 'react';
import Post from './Posts';
// import { data } from '../data';
import Threaditem from './Threaditem';

function Home() {
  // const Threads = data.map((item) => (
  //   <li key={item}>
  //     <p>title: {item.title}</p>
  //     <p>description: {item.description}</p>
  //     <p>createAt: {item.createAt}</p>
  //     <p>liked: {item.liked}</p>
  //   </li>
  // ));
  // console.log(data);
  return (
    <>
      <Post />
      <Threaditem id="123" />
      <Threaditem id="123" />
      <Threaditem id="123" />
      <Threaditem id="123" />
      <Threaditem id="123" />
      <Threaditem id="123" />
      <Threaditem id="123" />
      <Threaditem id="123" />
    </>
  );
}

export default Home;
