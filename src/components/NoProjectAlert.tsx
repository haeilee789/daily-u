import React from 'react';


const NoProjectAlert = () => {
  return (
    <div className="w-full text-center p-10 border rounded-xl bg-white">
        <p className="text-xl text-indigo-600">아직 등록된 프로젝트가 없습니다. 🚀</p>
    </div>
  );
};

// 3. 다른 파일에서 이 컴포넌트를 사용할 수 있도록 내보냅니다 (export).
export default NoProjectAlert;