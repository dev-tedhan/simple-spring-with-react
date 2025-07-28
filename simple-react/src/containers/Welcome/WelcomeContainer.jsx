import { useEffect, useState } from "react";
import Welcome from "../../components/Welcome/Welcome";

function WelcomeContainer() {
  // 상태: 시간 문자열, 날짜 문자열, 인사말 메시지
  const [userName, setUserName] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [message, setMessage] = useState("");

  // 사용자 이름 (여기선 하드코딩, 실제론 props 또는 API 등으로 받음)
  // const userName = "한동석";

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://simple-spring:10000/api/members/name");
      const name = await response.text();
      setUserName(name);
    };

    fetchData();
  }, []);

  // 시간 업데이트 함수
  const updateTime = () => {
    const now = new Date();

    // 시간 포맷팅
    const hours = now.getHours();
    const hh = String(hours).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");
    setCurrentTime(`${hh}:${mm}:${ss}`);

    // 날짜 포맷팅
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const date = String(now.getDate()).padStart(2, "0");
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const dayName = days[now.getDay()];
    setCurrentDate(`${year}년 ${month}월 ${date}일 ${dayName}요일`);

    // 인사말 업데이트
    if (hours >= 5 && hours < 12) {
      setMessage("상쾌한 아침입니다!");
    } else if (hours >= 12 && hours < 17) {
      setMessage("활기찬 오후 되세요!");
    } else if (hours >= 17 && hours < 21) {
      setMessage("편안한 저녁 보내세요!");
    } else {
      setMessage("오늘도 좋은 하루 보내셨나요?");
    }
  };

  // 환영 애니메이션 상태 (opacity, translateY)
  const [animateStyle, setAnimateStyle] = useState({
    opacity: 0,
    transform: "translateY(20px)",
    transition: "all 0.6s ease-out",
  });

  // 컴포넌트 마운트 시 초기화 + 인터벌 설정
  useEffect(() => {
    updateTime();

    // 애니메이션 시작 (다음 프레임에 스타일 변경)
    requestAnimationFrame(() => {
      setAnimateStyle((prev) => ({
        ...prev,
        opacity: 1,
        transform: "translateY(0)",
      }));
    });

    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={animateStyle}>
      <Welcome
        userName={userName}
        message={message}
        currentTime={currentTime}
        currentDate={currentDate}
      />
    </div>
  );
}

export default WelcomeContainer;