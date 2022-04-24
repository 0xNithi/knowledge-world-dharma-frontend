import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { Button, Input } from '@kwd/ui';
import { useAuth } from '../stores/AuthReducer/Hook';

function ProfileModal(props) {
  const { getUser } = useAuth();
  const { user } = getUser();

  const [username, setName] = useState('');
  const [emailAddress, setEmail] = useState('');
  const [surname, setSurname] = useState('');
  const [givenname, setGivenname] = useState('');
  const handleKeyDown = () => {};
  const getPost = useCallback(async () => {
    try {
      const Token = JSON.parse(localStorage.getItem('app_user')).accessToken;
      const res = await axios.get(
        `https://localhost:44342/auth/profile/${user.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Token}`,
          },
        },
      );
      setEmail(res.data.emailAddress);
      setName(res.data.username);
      setSurname(res.data.surname);
      setGivenname(res.data.givenname);
    } catch (error) {
      console.log(error);
    }
  }, [user.id]);
  const submitHandle = async (e) => {
    e.preventDefault();
    const data = {
      emailAddress,
      username,
      surname,
      givenname,
    };
    try {
      const Token = JSON.parse(localStorage.getItem('app_user')).accessToken;
      await axios.put(
        `https://localhost:44342/auth/editProfile/${user.id}`,
        JSON.stringify(data),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Token}`,
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPost();
  }, [getPost]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none ">
      <div
        className="relative flex flex-col items-center justify-center rounded-md bg-slate-100"
        style={{ height: '450px', width: '650px' }}
      >
        <h3 className="text-3xl font-semibold text-black">Edit Profile</h3>
        <form
          className="flex flex-col items-center w-full"
          onSubmit={submitHandle}
        >
          <div className="flex flex-col w-3/5 gap-1">
            <Input
              label="อีเมล"
              placeholder="อีเมล"
              value={emailAddress}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Input
              label="ชื่อ"
              placeholder="ชื่อ"
              value={username}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <Input
              label="นามสกุล"
              placeholder="นามสกุล"
              value={surname}
              onChange={(e) => {
                setSurname(e.target.value);
              }}
            />
            <Input
              label="ชื่อเล่น"
              placeholder="ชื่อเล่น"
              value={givenname}
              onChange={(e) => {
                setGivenname(e.target.value);
              }}
            />
          </div>
          <div className="mt-4">
            <Button color="primary" type="submit">
              Edit{' '}
            </Button>
          </div>
        </form>
        <div
          className="absolute top-1 right-1 "
          onKeyPress={handleKeyDown}
          role="button"
          tabIndex="0"
          onClick={() => props.changeProfileState(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
