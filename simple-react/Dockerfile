# 1단계: 빌드 단계
FROM node:18 AS builder

# 앱 디렉토리 생성
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 나머지 소스 복사
COPY . .

# React 앱 빌드 (build/ 디렉토리 생성됨)
RUN npm run build

# 2단계: Nginx를 사용한 정적 파일 서비스
FROM nginx:alpine

# React 빌드 결과를 Nginx 기본 루트로 복사
COPY --from=builder /app/build /usr/share/nginx/html

# Nginx 설정 파일 덮어쓰기 (선택)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Nginx 포트 오픈
EXPOSE 80

# 컨테이너 시작 시 Nginx 실행
CMD ["nginx", "-g", "daemon off;"]