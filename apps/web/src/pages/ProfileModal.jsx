import React from 'react';
import { Button, Input } from '@kwd/ui';

function ProfileModal(props) {
  const handleKeyDown = () => {};
  return (
    <>
      {props.showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none ">
          <div
            className="relative flex flex-col items-center justify-center rounded-md bg-slate-100"
            style={{ height: '450px', width: '650px' }}
          >
            <h3 className="text-3xl font-semibold text-black">Edit Profile</h3>
            <div className="w-3/5">
              <Input
                id="name"
                label="Name"
                type="text"
                placeholder="Your name"
              />
            </div>
            <div className="mt-4">
              <Button color="primary">Edit </Button>
            </div>
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
      )}
    </>
  );
}

export default ProfileModal;
