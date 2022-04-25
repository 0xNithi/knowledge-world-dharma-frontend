import React from 'react';
import { Input } from '@kwd/ui';
import { Link } from 'react-router-dom';
import { useModal } from '../stores/ModalReducer/Hook';
import { useAuth } from '../stores/AuthReducer/Hook';

function Posts(props) {
  const { showModal } = useModal();
  const { getUser } = useAuth();
  const user = getUser();
  const handleKeyDown = () => {};
  return (
    <div className="flex flex-col w-2/4 mt-20 bg-white rounded-md h-14">
      <div className="flex flex-row items-center w-full h-full gap-4">
        {user.user ? (
          <Link to="/postform" className="w-9/12 ml-6 ">
            <Input label="" placeholder="Create Post" />
          </Link>
        ) : (
          <div
            className="w-9/12 ml-6 "
            onKeyPress={handleKeyDown}
            role="button"
            tabIndex="0"
            onClick={showModal}
          >
            <Input label="" placeholder="Create Post" />
          </div>
        )}
        <div className="flex justify-center w-2/12 mt-3 mr-2">
          <div className="h-full mb-3 xl:w-96">
            <select
              onChange={(e) => {
                props.changeSelectFilterState(e.target.value);
              }}
              className="block w-full m-0 text-xs font-normal text-gray-400 transition ease-in-out bg-no-repeat border border-gray-400 border-solid rounded appearance-none bg-slate-200 form-select bg-clip-padding focus:text-gray-700 focus:bg-white "
              aria-label="Default select example"
              style={{ padding: '5px 5px' }}
            >
              <option selected value="0">
                Filter
              </option>
              <option value="1">by most like</option>
              <option value="2">by comments</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
