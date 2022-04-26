import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import PostForm from './pages/PostForm';
import Home from './pages/Home';
import Threadinfo from './pages/Threadinfo';
import Topbar from './pages/Topbar';
import MyPost from './pages/MyPost';
import LoginModal from './pages/LoginModal';
import SignupModal from './pages/SignupModal';
import ProfileModal from './pages/ProfileModal';
import EditForm from './pages/EditForm';
import EditCommentForm from './pages/EditCommentForm';
import { useModal } from './stores/ModalReducer/Hook';
import { useAuth } from './stores/AuthReducer/Hook';
import BanModal from './pages/BanModal';

function App() {
  const { getModal } = useModal();
  const { getUser } = useAuth();
  const { user } = getUser();
  const modal = getModal().ModalState;
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSignupModal, setshowSignupModal] = useState(false);
  const [showmenu, setShowmenu] = useState(false);
  const [searchWord, setsearchWord] = useState('');
  useEffect(() => {
    if (user) {
      if (user.banned) {
        const root = document.getElementById('root');
        root.classList.add('grayscale');
      }
    }
  }, []);

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
        {user && user.banned && (
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
        {user && user.banned && <BanModal />}

        <Routes>
          <Route path="/" element={<Home searchWord={searchWord} />} />
          <Route path="/postform" element={<PostForm />} />
          <Route path="/editform/:id" element={<EditForm />} />
          <Route path="/editcommentform/:id" element={<EditCommentForm />} />
          <Route path="/thredinfo/:id" element={<Threadinfo />} />
          <Route
            path="/my-posts"
            element={<MyPost searchWord={searchWord} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
