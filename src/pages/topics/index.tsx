import React, { useState } from "react";
import _ from "lodash";
import { collection, getDocs, query, where, documentId } from "firebase/firestore";
import { db } from "../../firebase";
import { useQuery } from "@tanstack/react-query";

interface Topic {
  uid: string;
  category: string;
  type: string;
  subtype: string;
  content: string;
}

export default function Topics() {
  const [groupName, setGroupName] = useState("");
  const [studentName, setStudentName] = useState("");
  const [keyArr, setKeyArr] = useState<string[]>([]);
  const [sessionDate, setSessionDate] = useState("");
  const homeworkRef = collection(db, "homework");
  const homeworkCollection = query(homeworkRef);

  const { data: homeworkData, isFetching: isHomeworkFetching } = useQuery({
    queryKey: ["homework", sessionDate],
    queryFn: async (): Promise<Topic[]> => {
      if (_.isEmpty(keyArr)) {
        return [];
      }
      const topicsRef = collection(db, "topics");
      const topicsQuery = query(topicsRef, where(documentId(), "in", keyArr));
      const topicsQuerySnapshot = await getDocs(topicsQuery);
      return topicsQuerySnapshot.docs.map((doc) => doc.data()) as Topic[];
    },
    staleTime: 1000 * 60 * 10, // 10분
  });

  interface HomeworkData {
    [key: string]: string[];
  }

  const { data: dateKeyData } = useQuery<HomeworkData | undefined>({
    queryKey: ["group", groupName],
    queryFn: async (): Promise<HomeworkData> => {
      if (groupName === "") {
        return {};
      }
      const querySnapshot = await getDocs(homeworkCollection);
      let homework = {};
      querySnapshot.forEach((doc) => {
        if (doc.id === groupName) {
          homework = doc.data();
        }
      });
      return homework;
    },
    staleTime: 1000 * 60, // 1분
  });

  console.log({ groupName });

  const { data } = useQuery({
    queryKey: ["student", studentName],
    queryFn: async () => {
      if (groupName === "") {
        return [];
      }
      const groupRef = collection(db, "groups");
      const studentsQuery = query(groupRef);
      const studentsQuerySnapshot = await getDocs(studentsQuery);
      return studentsQuerySnapshot.docs.map((doc) => doc.data());
    },
    staleTime: 1000 * 60, // 1분
  });

  console.log({ data });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formObject = Object.fromEntries(formData.entries());
    setGroupName(formObject.groupName as string);
  };
  const isTopicsObjEmpty = _.isEmpty(dateKeyData);
  return (
    <div className="w-full h-full max-w-5xl p-4 md:p-8 flex flex-col items-center justify-start gap-4">
      <div className="w-full flex flex-col gap-3 rounded-md bg-white dark:bg-slate-700 p-3">
        <h3 className="font-bold text-lg px-1">주간 토픽 검색</h3>
        <div className="w-full h-px bg-slate-400" />
        <div className="w-full flex flex-col gap-2 px-2">
          <h4 className="font-medium">스터디 그룹명을 입력해주세요</h4>
          <form onSubmit={onSubmit} className="w-full flex gap-2 px-1">
            <input
              className="bg-transparent border-b-[1px] border-solid border-b-slate-400"
              name="groupName"
              type="text"
              required
              onChange={() => setSessionDate("")}
            />
            <button type="submit" className="hover:[&_p]:font-medium">
              <p>검색</p>
            </button>
          </form>
        </div>
        <div
          className={`w-full flex flex-col gap-2 px-2 ${
            isTopicsObjEmpty
              ? "invisible max-h-0 overflow-hidden transla translate-y-2 opacity-50"
              : "visible translate-y-0 opacity-100 transition-all duration-200"
          } `}
        >
          <h4 className="font-medium">수업일을 선택해주세요</h4>
          <div className="w-full flex gap-2 flex-wrap">
            {!_.isEmpty(dateKeyData) &&
              Object.entries(dateKeyData).map(([date, keys]) => (
                <button
                  key={date}
                  className="px-2 bg-blue-100 hover:bg-gradient-to-r hover:from-indigo-200 hover:to-blue-200"
                  onClick={() => {
                    setSessionDate(date);
                    setKeyArr(keys);
                  }}
                >
                  {date}
                </button>
              ))}
          </div>
        </div>
        <div className={`w-full flex flex-col gap-2 px-2`}>
          <h4 className="font-medium">숙제 제출 및 열람을 하려면 내 이름을 선택해주세요</h4>
          <div className="w-full flex gap-2 flex-wrap"></div>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto">
        {isHomeworkFetching && <p>Loading...</p>}
        {homeworkData?.map(({ uid, category, type, subtype, content }, idx) => (
          <div
            key={uid}
            className="w-full rounded-md p-3 bg-white dark:bg-slate-700 mini-scroll scroll flex flex-col gap-y-1"
          >
            <p className="font-medium">
              {idx + 1}. <span>{category}</span>
            </p>
            <div className="w-full flex gap-x-2 gap-y-1 flex-wrap">
              <div className="w-fit px-1 rounded-sm whitespace-nowrap overflow-ellipsis bg-indigo-100 dark:bg-indigo-500 dark:bg-opacity-40">
                <p>{type}</p>
              </div>
              <div className="w-fit px-1 rounded-sm whitespace-nowrap overflow-ellipsis bg-violet-100 dark:bg-violet-500 dark:bg-opacity-40">
                <p>{subtype}</p>
              </div>
            </div>
            <div className="w-full my-2 h-px bg-slate-400" />
            <p>{content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
