import userData from "../../mock/mockUserData.json";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect } from "react";

interface HomeworkData {
  done: number;
  assigned: number;
}

interface UserData {
  name: string;
  useremail: string;
  homework: Record<string, HomeworkData>;
}

export default function Main() {
  const user: UserData = userData as UserData;
  const latestHomeworkDate = Math.max(...Object.keys(user.homework).map(Number));
  const latestData = user.homework[latestHomeworkDate.toString()];

  const getTopics = async () => {
    const snapshot = await getDocs(collection(db, "topics"));
    return snapshot;
  };

  useEffect(() => {
    console.log(getTopics());
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1>안녕하세요, {userData.name} 님!</h1>
      {latestData.done === latestData.assigned ? (
        <h5>이번 주 숙제를 완전히 끝냈네요!</h5>
      ) : (
        <h5>
          {latestData.assigned} 개 중 {latestData.done} 개를 완료했어요!
        </h5>
      )}
    </div>
  );
}
