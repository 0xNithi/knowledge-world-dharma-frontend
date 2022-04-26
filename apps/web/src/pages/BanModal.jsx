import React from 'react';

function BanModal() {
  return (
    <div className=" fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none rounded">
      <div
        className="relative flex flex-col items-center justify-center rounded-md bg-slate-100 text-red-600 rounded overflow-hidden"
        style={{ height: '500px', width: '650px' }}
      >
        <img
          src="http://www.makkahinstitute.org/uploads/8/1/6/4/81640242/130471803-portrait-of-sad-depressed-crying-muslim-woman-in-black-and-white-concept-of-abused-woman_orig.jpg"
          alt=""
          className="w-full h-full "
        />
        <div className="absolute text-red-600 text-xl font-black flex flex-col justify-center items-center">
          <p>ขณะนี้คุณไม่สามารถเข้าใช้งานได้ในระบบ กรุณาติดต่อเจ้าหน้าที่</p>
          <p>064-063-0406</p>
        </div>
      </div>
    </div>
  );
}

export default BanModal;
