import React, { useState } from 'react';

const ButtonAbout = () => {
  const [isOpen, setIsOpen] = useState(false);
  // 모달 열기/닫기 함수
  const toggleModal = () => setIsOpen(!isOpen);
    // @apply bg-[#F9DFDF] hover:bg-[#F5AFAF] text-[#7D7373] font-bold py-2 px-4 rounded transition duration-150;

  return (
    <>
      <button className=" bg-[#F5AFAF] hover:bg-[#F9DFDF] text-[#7D7373] font-bold py-2 px-4 rounded transition duration-150;"
        onClick={toggleModal}
      >
        About & How to Use
      </button>

      {isOpen && (
        <div
          // 배경: 검정 반투명(bg-black/50) + 흐림 효과(backdrop-blur-sm)
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={toggleModal} // 배경 클릭 시 닫힘
        >
          {/* 모달 콘텐츠 박스 */}
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()} // 콘텐츠 클릭 시에는 닫히지 않도록 방지
          >
            {/* 이미지 섹션 */}
            <div className="w-full h-48 bg-gray-200">
              {/* <img
                src="/api/placeholder/400/200" // 여기에 실제 이미지 경로를 넣으세요
                alt="프로젝트 대표 이미지"
                className="w-full h-full object-cover"
              /> */}
            </div>

            {/* 텍스트 섹션 */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800">Coming soon</h2>
              <p className="text-gray-600 mt-2 leading-relaxed text-left">
                Today's Action: Today Only
              </p>

              {/* 하단 버튼 영역 */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={toggleModal}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-all"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ButtonAbout;