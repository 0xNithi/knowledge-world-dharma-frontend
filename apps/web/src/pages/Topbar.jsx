import React, { useState } from 'react';
import { Button, Input } from '@kwd/ui';
import { useAuth } from '../stores/AuthReducer/Hook';
import { useModal } from '../stores/ModalReducer/Hook';

function Topbar(props) {
  const { showModal } = useModal();
  const [showmenu, setShowmenu] = useState(false);
  const { getUser, logoutAuth } = useAuth();
  const user = getUser();
  const toggleMenuBar = () => {
    setShowmenu(!showmenu);
  };
  const Logout = () => {
    logoutAuth();
    localStorage.clear();
    setShowmenu(false);
  };
  const handleKeyDown = () => {};
  return (
    <div className="fixed w-full h-12 bg-white ">
      <div className="flex flex-row items-center justify-between w-full full">
        <div className="w-10 h-10 my-1 ml-2">
          <img
            className="w-full h-full"
            src="https://trisikkha.org/wp-content/uploads/2020/01/trisikkha-logo-1450.png"
            alt="logo"
          />
        </div>
        <div className="flex flex-row items-center justify-center w-full ">
          <div className="w-6/12 ml-18">
            <Input label="" placeholder="Serach hastag" />
          </div>
        </div>
        <div className="relative flex flex-row items-center">
          {!user.user ? (
            <div className="flex flex-row gap-3 w-36">
              <Button color="secondary" onClick={showModal}>
                Log in
              </Button>

              <Button
                color="primary"
                onClick={() => props.changeSignupState(true)}
              >
                Sign Up
              </Button>
            </div>
          ) : (
            <div
              className="flex flex-row px-2 py-1 mr-3 border outline-none"
              onClick={toggleMenuBar}
              onKeyPress={handleKeyDown}
              role="button"
              tabIndex="0"
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          )}
          {showmenu && (
            <div className="absolute right-0 w-48 bg-white top-6 ">
              <ul className="my-2 ml-3 ">
                <li>Dark Mode</li>
                <li>
                  <span
                    onKeyPress={handleKeyDown}
                    role="button"
                    tabIndex="0"
                    onClick={() => props.changeProfileState(true)}
                  >
                    Profile
                  </span>
                </li>
                <li>
                  {user.user ? (
                    <span
                      onKeyPress={handleKeyDown}
                      role="button"
                      tabIndex="0"
                      onClick={Logout}
                    >
                      Sign out
                    </span>
                  ) : (
                    <span
                      onKeyPress={handleKeyDown}
                      role="button"
                      tabIndex="0"
                      onClick={showModal}
                    >
                      Sign in
                    </span>
                  )}
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Topbar;
