import React, { useState } from 'react';
import axios from 'axios';
import { Button, Input } from '@kwd/ui';
import { useAuth } from '../stores/AuthReducer/Hook';
import { useModal } from '../stores/ModalReducer/Hook';
import { BACKEND_ENDPOINT } from '../config.json';

function LoginModal() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { unShowModal } = useModal();
  const handleKeyDown = () => {};
  const { loginAuth, SetAccessToken } = useAuth();
  const SubmitLogin = async (e) => {
    e.preventDefault();
    const data = {
      username,
      password,
    };
    try {
      const res = await axios.post(
        `${BACKEND_ENDPOINT}/auth/login`,
        JSON.stringify(data),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
      SetAccessToken(res.data);
      const Token = JSON.parse(localStorage.getItem('app_user')).accessToken;
      const respone = await axios.get(`${BACKEND_ENDPOINT}/auth/profile`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      });
      loginAuth(respone.data);
      unShowModal();
    } catch (error) {
      alert('กรุณาเข้าสู่ระบบใหม่อีกครั้ง');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none ">
      <form onSubmit={SubmitLogin}>
        <div
          className="relative flex flex-col items-center justify-center rounded-md bg-slate-100"
          style={{ height: '450px', width: '650px' }}
        >
          <h3 className="text-3xl font-semibold text-black">Login</h3>
          <div className="w-3/5">
            <Input
              id="username"
              label="Username"
              type="text"
              placeholder="Your username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <Input
              id="password"
              label="Password"
              type="password"
              placeholder="Your password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="mt-4">
            <Button color="primary" type="submit">
              Login
            </Button>
          </div>
          <div
            className="absolute top-1 right-1 "
            onKeyPress={handleKeyDown}
            role="button"
            tabIndex="0"
            onClick={unShowModal}
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
      </form>
    </div>
  );
}

export default LoginModal;
