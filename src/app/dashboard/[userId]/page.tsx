"use client";

import useUserInfoStore from "@/hooks/useUserInfoStore";
import useAuth from "@/hooks/useAuth";

const DashboardPage = () => {
  const userInfo = useUserInfoStore();
  useAuth();

  return (
    <div>
      <h1>{userInfo.name}님 환영합니다!</h1>
      <h2>당신의 색깔은 {userInfo.color}입니다.</h2>
      <h3>호스팅 중인 방</h3>
      <ul>
        {userInfo.hostingRooms.map((room) => (
          <li key={room}>{room}</li>
        ))}
      </ul>
      <h3>참여 중인 방</h3>
      <ul>
        {userInfo.joinedRooms.map((room) => (
          <li key={room}>{room}</li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardPage;
