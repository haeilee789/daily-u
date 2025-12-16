import React from 'react';

// flex flex-col items-center
const NoProjectAlert = () => {
  return (
    <div className="w-full text-center p-5 border rounded-xl bg-white m-3 ">
        <p className="text-xl text-[#E58E8E] ">Clear for today! 🚀</p>
    </div>
  );
};

// 3. 다른 파일에서 이 컴포넌트를 사용할 수 있도록 내보냅니다 (export).
export default NoProjectAlert;