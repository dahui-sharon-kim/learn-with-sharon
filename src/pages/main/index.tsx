import userData from "../../mock/mockUserData.json";

export default function Main() {
  const homeworkDateKeys = Object.keys(userData.homework);
  const latestData = userData.homework[homeworkDateKeys[homeworkDateKeys.length - 1]];
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
