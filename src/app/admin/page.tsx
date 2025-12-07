'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { collection, addDoc, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from '@/firebase/firebase.js'; // 위에서 생성한 db 인스턴스
import { useAuth }from '@/hooks/useAuth'; // <--- 🔑 커스텀 훅 불러오기
import { useAuthContext } from "@/context/AuthContext";


import CreateProjectModal from "@/components/CreateProjectModal";
import NoProjectAlert from "@/components/NoProjectAlert";
import ProjectCard from "@/components/ProjectCard";
import SignOutButton from "@/components/signOut";

interface EditProjectModalProps {
  onClose: () => void; // 모달을 닫는 함수 (필수)
  // title?: string;    // 만약 optional한 string 타입의 title을 추가하고 싶다면 이렇게 정의합니다.
}

function CreateProject({ onClose }: EditProjectModalProps) {
  const [projectName, setProjectName] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]); // 오늘 날짜로 초기화x
  const { user, loading } = useAuth();
  const handleSave = async (e: React.FormEvent) => {
    console.log(db);
    e.preventDefault(); 
    
    // 로딩 중이거나 사용자가 없으면 저장 중단
    if (loading) return;
    if (!user) {
      alert("로그인이 필요합니다. 프로젝트를 저장할 수 없습니다.");
      return; 
    }
    const currentUserId = user.uid;

    if (!projectName) { 
      alert("프로젝트 이름을 입력하세요.");
      return; 
    }

  
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* 오버레이 (배경 흐림 효과) */}
      {/* <div 
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose} // 배경 클릭 시 닫기
      ></div> */}

      {/* 모달 내용 (Content) */}
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full relative z-10">
        
        <h2 className="text-2xl font-bold mb-4">프로젝트 생성</h2>
        
        {/* 수정 폼 필드 예시 */}
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              프로젝트 이름
            </label>
            <input 
                type="text" 
                id="name" 
                className="shadow border rounded w-full py-2 px-3" 
                placeholder="프로젝트 이름을 입력하세요" 
                value={projectName} 
                onChange={(e) => setProjectName(e.target.value)}
            />
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button 
              type="button" 
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
            >
              취소
            </button>
            <button 
              type="submit" 
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              저장
            </button>
          </div>
          
        </form>
        
      </div>
    </div>
  );
}

function EditAction({ onClose }: { onClose: () => void }) {
  // 모달 내의 상태 관리 (예: 입력 필드 값)는 여기에 추가됩니다.
  const [projectName, setProjectName] = useState(''); 
  
  return (
    // 전체 컨테이너: 화면 전체에 고정(fixed), 중앙 정렬
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* 오버레이 (배경 흐림 효과) */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose} // 배경 클릭 시 닫기
      ></div>

      {/* 모달 내용 (Content) */}
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full relative z-10">
        
        <h2 className="text-2xl font-bold mb-4">액션 정보 수정</h2>
        
        {/* 수정 폼 필드 예시 */}
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              액션 이름
            </label>
            <input 
                type="text" 
                id="name" 
                className="shadow border rounded w-full py-2 px-3" 
                placeholder="액션 내용을 입력하세요" 
            />
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button 
              type="button" 
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
            >
              취소
            </button>
            <button 
              type="submit" 
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              저장
            </button>
          </div>
          
        </form>
        
      </div>
    </div>
  );
}

function Page() {
  const { user, loading } = useAuthContext();  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);  
  const [loadingProjects, setLoadingProjects] = useState(true);

  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const openActionModal = () => setIsActionModalOpen(true);
  const closeActionModal = () => setIsActionModalOpen(false);

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const openProjectModal = () => setIsProjectModalOpen(true);
  const closeProjectModal = () => setIsProjectModalOpen(false);

// 🔑 1. 프로젝트 목록을 저장할 상태
interface Project {
    id: string;
    name: string;
    userId: string;
    goal: string;
    startDate: string; //Timestamp.now() from fb
    finishDate: string; //Timestamp.now() from fb
    is_completed: boolean;
    }

    interface User {
    id: string; //이메일
    nickname: string;
  }


  
  useEffect(() => {
    // 인증 로딩 중이면 기다립니다.
    if (loading) {return }

    setLoadingProjects(true);

    const fetchProjects = async () => {
      // 🚨 사용자가 로그인하지 않았으면 종료
      if (!user) {
        setProjects([]);
        setLoadingProjects(false);
        return;
      }

      try {
        // Firestore 쿼리 정의: Projects 컬렉션에서 userId가 현재 사용자의 uid와 일치하는 문서만 조회
        const q = query(
          collection(db, "Projects"),
          where("userId", "==", user.uid)
        );

        // 쿼리 실행
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);
        // 결과 처리: 문서 ID와 데이터를 포함하여 배열로 저장
        
        const projectsList = querySnapshot.docs.map(doc => ({
          id: doc.id, // 문서 ID (key로 사용)
          ...doc.data() as Omit<Project, 'id'> // 실제 프로젝트 데이터
        }));

// 🔑  변환된 배열을 상태에 저장합니다.
setProjects(projectsList);

      } catch (error) {
        console.error("프로젝트 조회 중 오류 발생:", error);
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, [user, loading]); // 🔑 user나 인증 상태가 변할 때마다 다시 실행

  
  useEffect(() => {
    // Redirect to the home page if the user is not logged in
    if (user == null) {
      router.push("/");
    }
    // }, [ user ] );
  }, [user, router]); // Include 'router' in the dependency array to resolve eslint warning

  return (
    <div className="container mx-auto ">
      <div className="flex justify-center items-center">
          <h1 className="text-gray-900 
             text-5xl sm:text-7xl lg:text-8xl      /* 반응형 크기: 5xl -> 7xl -> 8xl */
             font-semibold                        /* 굵기: 800 (아주 굵게) */
             leading-none                          /* 행간: 좁게 (가장 좁게) */
             tracking-tight mb-4">                 
          DAILY-U
        </h1> 
      </div>
           
      <div className="flex justify-between items-center space-x-6">
      {/* 덩어리 1 */}
        <div className="w-1/3 p-6 border border-gray-200 rounded-xl shadow-md text-center bg-white">
          <p className="text-xl font-semibold mb-3">YESTERDAY</p>
          <p className="text-sm text-gray-500 mb-4">Cherry space</p>
        </div>

        
      {/* 덩어리 2 */}
      <div className="w-1/3 p-6 border border-gray-200 rounded-xl shadow-md text-center bg-white">
        <p className="text-xl font-semibold mb-3">TODAY</p>
           
           
            {loading || loadingProjects ? (
            <p className="text-lg text-gray-500">데이터를 불러오는 중입니다...</p>
              ) : (
              
              // 🔑 프로젝트 목록 표시
              <div className="flex flex-wrap gap-6">
                {projects.length === 0 ? (
                  <NoProjectAlert/>

                ) : (
                  
                  // 조회된 프로젝트를 반복하여 덩어리(카드)로 보여줍니다.
                  projects.map(project => (
                    <div 
                      key={project.id} 
                      className="w-80 p-6 border rounded-xl shadow-lg bg-white transform hover:shadow-xl transition"
                    >
                      <h3 className="text-2xl font-bold mb-3 text-gray-800">{project.name}</h3> {/* 🔑 프로젝트 이름 */}
                      <p className="text-sm text-gray-500 mb-4">시작일: {project.startDate}</p>
                      
                      {/* 여기에 할 일 목록 등의 추가 정보가 들어갑니다 */}

                      <button 
                        onClick={openActionModal} 
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded mt-4"
                      >
                        상세 보기 / 수정
                      </button>
                    </div>
                  ))
                )}
            </div>
           )}
      
        <button 
          onClick={openProjectModal} 
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-150"          >
          프로젝트 추가
        </button>
      </div>
      
      {/* 덩어리 3 */}
        <div className="w-1/3 p-6 border border-gray-200 rounded-xl shadow-md text-center bg-white">
          <p className="text-xl font-semibold mb-3">Setting Space</p>
          <SignOutButton/>
          
        </div>
        {isActionModalOpen && <EditAction onClose={closeActionModal} />}
        {/* {isProjectModalOpen && <CreateProject onClose={closeProjectModal} />} */}
        {isProjectModalOpen && <CreateProjectModal isOpen={isProjectModalOpen} onClose={closeProjectModal} />}

    </div>
    </div>
  );
}

export default Page;
