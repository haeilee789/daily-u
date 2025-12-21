/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // 이 줄이 핵심입니다! 빌드 결과물을 정적 파일(HTML/JS/CSS)로 뽑아줍니다.
    images: {
        unoptimized: true, // 정적 배포 시 이미지 최적화 기능을 끕니다.
    },
};

module.exports = nextConfig;
