import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import PostForm from './pages/PostForm';
import Home from './pages/Home';
import Threadinfo from './pages/Threadinfo';
import Topbar from './pages/Topbar';
import LoginModal from './pages/LoginModal';
import SignupModal from './pages/SignupModal';
import ProfileModal from './pages/ProfileModal';
import { useModal } from './stores/ModalReducer/Hook';

function App() {
  const { getModal } = useModal();
  const modal = getModal().ModalState;
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSignupModal, setshowSignupModal] = useState(false);
  return (
    <div className="relative w-full min-h-screen bg-slate-200">
      <div className="flex flex-col items-center w-full h-full">
        {modal && (
          <div className="absolute z-30 w-full h-full bg-black opacity-30">
            {}
          </div>
        )}
        {showSignupModal && (
          <div className="absolute z-30 w-full h-full bg-black opacity-30">
            {}
          </div>
        )}
        {showProfileModal && (
          <div className="absolute z-30 w-full h-full bg-black opacity-30">
            {}
          </div>
        )}
        <Topbar
          changeSignupState={(data) => setshowSignupModal(data)}
          changeProfileState={(word) => setShowProfileModal(word)}
        />
        <LoginModal />
        <ProfileModal
          showProfileModal={showProfileModal}
          changeProfileState={(word) => setShowProfileModal(word)}
        />
        <SignupModal
          showSignupModal={showSignupModal}
          changeSignupState={(word) => setshowSignupModal(word)}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/postform" element={<PostForm />} />
          <Route path="/thredinfo/:id" element={<Threadinfo />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
