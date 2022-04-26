import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Input } from '@kwd/ui';
import { useAuth } from '../stores/AuthReducer/Hook';
import { useModal } from '../stores/ModalReducer/Hook';

function Topbar(props) {
  const { showModal } = useModal();
  const { getUser, logoutAuth } = useAuth();

  const user = getUser();
  const toggleMenuBar = () => {
    props.changeMenuBarState(!props.showmenu);
  };
  const Logout = () => {
    logoutAuth();
    localStorage.clear();
    props.changeMenuBarState(false);
  };
  const handleKeyDown = () => {};
  return (
    <div className="fixed w-full h-12 bg-white z-50">
      <div className="flex flex-row items-center justify-between w-full full">
        <Link to="/">
          <div className="w-64 my-1 ml-2 text-3xl">
            🕌 <span className="text-lg underline">มุสลิมทอล์ค</span>
          </div>
        </Link>
        <div className="flex flex-row items-center justify-center w-3/4 ">
          <div className="w-8/12 ">
            <Input
              label=""
              placeholder="ค้นหาจากหมวดหมู่"
              onChange={(e) => {
                props.changeWordState(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="relative flex flex-row items-center">
          {!user.user ? (
            <div className="flex flex-row gap-3 mr-4">
              <Button color="secondary" onClick={showModal}>
                เข้าสู่ระบบ
              </Button>

              <Button
                color="primary"
                onClick={() => props.changeSignupState(true)}
              >
                สมัครสมาชิก
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
          {props.showmenu && (
            <div className="absolute right-0 w-48 bg-white top-6 mr-4">
              <ul className="my-2 ml-3 ">
                <li>
                  <Link to="/my-posts">โพสต์ของฉัน</Link>
                </li>
                <li>
                  <span
                    onKeyPress={handleKeyDown}
                    role="button"
                    tabIndex="0"
                    onClick={() => props.changeProfileState(true)}
                  >
                    ข้อมูลผู้ใช้
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
                      ออกจากระบบ
                    </span>
                  ) : (
                    <span
                      onKeyPress={handleKeyDown}
                      role="button"
                      tabIndex="0"
                      onClick={showModal}
                    >
                      เข้าสู่ระบบ
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
