import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import PostForm from './pages/PostForm';
import Home from './pages/Home';
import Threadinfo from './pages/Threadinfo';
import Topbar from './pages/Topbar';
import LoginModal from './pages/LoginModal';
import SignupModal from './pages/SignupModal';
import ProfileModal from './pages/ProfileModal';
import EditForm from './pages/EditForm';
import EditCommentForm from './pages/EditCommentForm';
import { useModal } from './stores/ModalReducer/Hook';

function App() {
  const { getModal } = useModal();
  const modal = getModal().ModalState;
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSignupModal, setshowSignupModal] = useState(false);
  const [showmenu, setShowmenu] = useState(false);
  const [searchWord, setsearchWord] = useState('');
  return (
    <div className="relative w-full min-h-screen font-mono bg-gradient-to-b from-emerald-400 to-lime-200">
      <div className="flex flex-col items-center w-full h-full">
        <Topbar
          showmenu={showmenu}
          changeMenuBarState={(data) => setShowmenu(data)}
          changeSignupState={(data) => setshowSignupModal(data)}
          changeProfileState={(word) => setShowProfileModal(word)}
          changeWordState={(word) => setsearchWord(word)}
        />
        {modal && (
          <div className="absolute z-30 w-full h-full bg-black opacity-30">
            {}
          </div>
        )}
        {modal && <LoginModal />}
        {showSignupModal && (
          <div className="absolute z-30 w-full h-full bg-black opacity-30">
            {}
          </div>
        )}
        {showProfileModal && (
          <ProfileModal
            changeMenuBarState={(data) => setShowmenu(data)}
            showProfileModal={showProfileModal}
            changeProfileState={(word) => setShowProfileModal(word)}
          />
        )}
        {showProfileModal && (
          <div className="absolute z-30 w-full h-full bg-black opacity-30">
            {}
          </div>
        )}

        {showSignupModal && (
          <SignupModal
            showSignupModal={showSignupModal}
            changeSignupState={(word) => setshowSignupModal(word)}
          />
        )}

        <Routes>
          <Route path="/" element={<Home searchWord={searchWord} />} />
          <Route path="/postform" element={<PostForm />} />
          <Route path="/editform/:id" element={<EditForm />} />
          <Route path="/editcommentform/:id" element={<EditCommentForm />} />
          <Route path="/thredinfo/:id" element={<Threadinfo />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
