const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Firebase Admin SDK 초기화 (이미 되어 있다면 생략)
admin.initializeApp();
const db = admin.firestore();

/**
 * 프로젝트별 일일 Action 문서를 생성하는 함수
 * Cloud Scheduler에 의해 HTTP 요청으로 호출됩니다.
 */
exports.createDailyActionsForAllProjects = functions.https.onRequest(async (req, res) => {
    // 💡 보안 강화: Cloud Scheduler 요청인지 확인하는 로직을 추가하는 것을 권장합니다.
    
    // 1. 오늘 날짜 포맷팅 (YYYY-MM-DD)
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const dateId = `${year}-${month}-${day}`;

    // 2. Firestore 배치 쓰기(Batch Write) 객체 생성
    // 여러 문서를 하나의 요청으로 효율적으로 처리하기 위함
    const batch = db.batch();
    let actionCount = 0;

    try {
        // 3. 모든 'projects' 문서 가져오기
        const projectsSnapshot = await db.collection('projects').get();

        if (projectsSnapshot.empty) {
            console.log('생성할 프로젝트가 없습니다.');
            return res.status(200).send('No projects found to process.');
        }

        // 4. 프로젝트 순회하며 Action 문서 생성
        projectsSnapshot.forEach(projectDoc => {
            const projectId = projectDoc.id;
            const projectType = projectDoc.type;

            // 5. Action 인터페이스에 맞춘 데이터 생성
            const newActionData = {
                content: '', 
                projectId: projectId,
                type: projectType,
                isCompleted: false,
                reason: '',
                date: dateId, 
                createdAt: admin.firestore.FieldValue.serverTimestamp() // 생성 시간 기록
            };
            
            // 6. 배치에 추가: 'actions' 컬렉션에 새 문서를 추가 (문서 ID는 자동 생성)
            const actionRef = db.collection('actions').doc();
            batch.set(actionRef, newActionData);
            
            actionCount++;
        });

        // 7. 배치 커밋: 모든 쓰기 작업을 한 번에 실행
        await batch.commit();

        console.log(`총 ${actionCount}개의 Action 문서가 성공적으로 생성되었습니다.`);
        res.status(200).send(`Successfully created ${actionCount} daily actions.`);

    } catch (error) {
        console.error('일일 Action 생성 중 오류 발생:', error);
        res.status(500).send('Internal Server Error: Failed to create daily actions.');
    }
});