import { useNavigate } from "react-router-dom";
import userData from "../../mock/mockUserData.json";

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
  const navigate = useNavigate();

  return (
    <div className="w-full h-full max-w-5xl flex flex-col items-center justify-center">
      <h1>안녕하세요, {userData.name} 님!</h1>
      {latestData.done === latestData.assigned ? (
        <h5>이번 주 숙제를 완전히 끝냈네요!</h5>
      ) : (
        <h5>
          {latestData.assigned} 개 중 {latestData.done} 개를 완료했어요!
        </h5>
      )}
      <div className="w-full p-8 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-2">
        <button
          className="w-full h-8 bg-white dark:bg-slate-600 border-solid border-[1px] border-slate-800 dark:border-slate-300"
          onClick={() => navigate("/topics")}
        >
          <p>위클리 토픽 보기</p>
        </button>
        <button
          className="w-full h-8 bg-white dark:bg-slate-600 border-solid border-[1px] border-slate-800 dark:border-slate-300"
          onClick={() => navigate("/homework")}
        >
          <p>위클리 숙제 보기</p>
        </button>
      </div>
    </div>
  );
}
