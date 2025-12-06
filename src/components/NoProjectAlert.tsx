import React from 'react';


// TypeScript 환경이므로, React.FC (Function Component) 타입을 명시할 수 있습니다.
const NoProjectAlert: React.FC = () => {
  // 2. 이 컴포넌트가 렌더링될 때 반환할 JSX(HTML 구조)를 작성합니다.
  // 이 경우, 가장 기본적인 div 태그를 반환합니다.
  return (
    <div className="w-full text-center p-10 border rounded-xl bg-white">
        <p className="text-xl text-indigo-600">아직 등록된 프로젝트가 없습니다. 🚀</p>
    </div>
  );
};

// 3. 다른 파일에서 이 컴포넌트를 사용할 수 있도록 내보냅니다 (export).
export default NoProjectAlert;