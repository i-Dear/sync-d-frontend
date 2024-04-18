"use client";

import useUserInfoStore from "@/hooks/useUserInfoStore";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";

const DashboardPage = () => {
  const userInfo = useUserInfoStore();
  useAuth();

  return (
    <div>
      <h1>{userInfo.name}님 환영합니다!</h1>
      <h3>호스팅 중인 방</h3>
      <ul>
        {userInfo.hostingRooms.map((room) => (
          <Link key={room} href={`/board/${room}`}>
            <li key={room}>{room}</li>
          </Link>
        ))}
      </ul>
      <h3>참여 중인 방</h3>
      <ul>
        {userInfo.joinedRooms.map((room) => (
          <Link key={room} href={`/board/${room}`}>
            <li key={room}>{room}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default DashboardPage;
