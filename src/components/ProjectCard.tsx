import { useState, useEffect } from 'react';
import { db } from '@/firebase/firebase';
// src/firebase/firebase.js
import { collection, query, where, getDocs, addDoc, updateDoc, doc, limit } from 'firebase/firestore'; 

interface User {
	id: string; //이메일
	nickname: string;
}

interface Project {
    id: string;
    name: string;
    userId: string;
    goal: string;
    startDate: string; //Timestamp.now() from fb
    finishDate: string; //Timestamp.now() from fb
    is_completed: boolean;
    }

interface Action {
    id: string; 
    content: string;
    projectId: string;
    is_completed: boolean;
	  reason: string;
	  date: string; //Timestamp.now() from fb
}

interface ProjectCardProps {
    project: Project;
    user: { uid: string, email: string } | null;
}

// 🔑 날짜를 'yyyymmdd' 형식의 문자열로 변환하는 헬퍼 함수 (오늘 액션 검색용)
const getTodayString = () => {
    const d = new Date();
    return d.toISOString().split('T')[0].replace(/-/g, ''); // 예: "20251124"
};

export default function ProjectCard({ project, user }: ProjectCardProps) {
    const [actions, setActions] = useState<Action[]>([]);
    const [loadingActions, setLoadingActions] = useState(true);
    const todayStr = getTodayString();


    // 🔑 액션 데이터 조회 및 자동 생성 로직
    useEffect(() => {
        if (!user || !project.id) return;
        setLoadingActions(true);

        const fetchAndCreateDailyAction = async () => {
            const actionsRef = collection(db, "Actions");
            
            // 1. 오늘 날짜의 액션이 있는지 확인 (프로젝트 ID 및 날짜 문자열 기준)
            const q = query(
                actionsRef,
                where("projectId", "==", project.id),
                where("dayKey", "==", todayStr), // 🔑 날짜키 필드 추가
                limit(1) // 하나만 있으면 되므로 제한
            );
            const snapshot = await getDocs(q);

            if (snapshot.empty) {
                // 2. 오늘 액션이 없으면 새로 자동 생성
                await addDoc(actionsRef, {
                    projectId: project.id,
                    content: `[자동 생성] ${project.name} 프로젝트 일일 검토`,
                    isCompleted: false,
                    is_completed: false, // 🔑 초기에는 수정되지 않은 상태
                    dayKey: todayStr, // 🔑 검색을 위해 날짜 키 저장
                    createdAt: new Date(),
                    userId: user.uid,
                });
                
                // 생성 후 다시 조회하거나, 단순화를 위해 새로고침/상태 업데이트 유도
                // 여기서는 새로 생성된 액션을 포함하여 다시 쿼리합니다.
                const newSnapshot = await getDocs(query(
                    actionsRef,
                    where("projectId", "==", project.id),
                    where("dayKey", "==", todayStr)
                ));
                
                const newActions = newSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Action));
                setActions(newActions);

            } else {
                // 3. 오늘 액션이 이미 있으면 목록을 업데이트
                const existingActions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Action));
                setActions(existingActions); 
            }

            setLoadingActions(false);
        };

        fetchAndCreateDailyAction();
    }, [user, project.id, todayStr]); // project.id나 날짜가 바뀔 때만 재실행

    
    // 🔑 스페이스필러 상태를 결정 (오늘 자동 생성된 액션이 수정되지 않았는지 확인)
    const showSpacefiller = actions.length > 0 && actions.every(a => a.content.includes('[자동 생성]') && a.is_completed === false);

    // 🔑 액션 수정 함수 (is_completed 상태 변경)
    const handleActionEdit = async (actionId: string, newContent: string) => {
        if (!user) return;
        
        const actionRef = doc(db, "Actions", actionId);
        
        await updateDoc(actionRef, {
            content: newContent,
            is_completed: true, // 🔑 수정되었음을 기록
            updatedAt: new Date(),
        });

        // 상태 업데이트
        setActions(actions.map(a => a.id === actionId ? { ...a, content: newContent, is_completed: true } : a));
    };

    return (
        <div className="w-80 p-6 border rounded-xl shadow-lg bg-white">
            <h3 className="text-2xl font-bold mb-3 text-gray-800">{project.name}</h3>
            
            <div className="mt-4 border-t pt-4">
                <h4 className="text-lg font-semibold mb-2">오늘의 액션 ({todayStr})</h4>
                
                {loadingActions ? (
                    <p className="text-sm text-gray-500">액션 로딩 중...</p>
                ) : (
                    <div>
                        {/* 🔑 액션 목록 렌더링 */}
                        {actions.map(action => (
                            <div key={action.id} className="p-2 border rounded mb-1 bg-gray-50">
                                {/* 🚨 실제 앱에서는 input/textarea로 감싸서 수정 기능을 제공해야 합니다. */}
                                <span className={action.is_completed ? 'font-normal' : 'italic text-red-500'}>
                                    {action.content}
                                </span>
                                
                                {/* 🔑 임시 수정 버튼 (테스트용) */}
                                {!action.is_completed && (
                                    <button 
                                        onClick={() => handleActionEdit(action.id, `새로 수정한 액션 내용: ${new Date().toLocaleTimeString()}`)}
                                        className="text-xs text-blue-500 ml-2"
                                    >
                                        수정하기
                                    </button>
                                )}
                            </div>
                        ))}

                        {/* 🔑 스페이스필러 (수정 이력이 없을 때) */}
                        {showSpacefiller && (
                            <div className="p-4 mt-2 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800">
                                <p className="font-bold">✨ 액션을 추가하세요!</p>
                                <p className="text-sm">자동 생성된 액션은 수정되지 않았습니다. 오늘 할 일을 입력해 주세요.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <p className="text-xs text-gray-400 mt-4">시작일: {project.startDate}</p>
        </div>
    );
}

// 이 컴포넌트를 ParentComponent에서 사용합니다.