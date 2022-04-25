import { Button, Input } from '@kwd/ui';
import axios from 'axios';
import React, { useState } from 'react';
import { BACKEND_ENDPOINT } from '../config.json';
import { useModal } from '../stores/ModalReducer/Hook';

function SignupModal(props) {
  const { showModal } = useModal();
  const [emailAddress, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [givenname, setGivename] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const handleKeyDown = () => {};
  const SinupHandleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username,
      emailAddress,
      password,
      givenname,
      surname,
    };
    try {
      await axios.post(
        `${BACKEND_ENDPOINT}/auth/register`,
        JSON.stringify(data),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      alert('คุณลงทะเบียนสำเร็จแล้ว ยินดีต้อนรับ!');
      props.changeSignupState(false);
      showModal();
    } catch (error) {
      alert('สมัครสมาชิกไม่สำเร็จ กรุณากรอกข้อมูลให้ถูกต้อง');
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none ">
      <form onSubmit={SinupHandleSubmit}>
        <div
          className="relative flex flex-col items-center justify-center rounded-md bg-slate-100"
          style={{ height: '450px', width: '650px' }}
        >
          <h3 className="text-3xl font-semibold text-black">Sign up</h3>
          <div className="w-3/5">
            <Input
              id="email"
              label="Email"
              type="email"
              placeholder="Your email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
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
              id="givename"
              label="Givenname"
              type="text"
              placeholder="Your givenname"
              onChange={(e) => {
                setGivename(e.target.value);
              }}
            />
            <Input
              id="surname"
              label="Surname"
              type="text"
              placeholder="Your surname"
              onChange={(e) => {
                setSurname(e.target.value);
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
            <Button type="submit" color="primary">
              Sign up
            </Button>
          </div>
          <div
            className="absolute top-1 right-1 "
            onKeyPress={handleKeyDown}
            role="button"
            tabIndex="0"
            onClick={() => props.changeSignupState(false)}
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

export default SignupModal;
