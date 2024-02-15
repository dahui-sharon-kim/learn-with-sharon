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
  const [uidsArr, setUidsArr] = useState<string[]>([]);
  const [sessionDate, setSessionDate] = useState("");
  const groupsRef = collection(db, "groups");
  const homeworkRef = collection(db, "homework");
  const topicsRef = collection(db, "topics");

  const { data: homeworkData, isFetching: isHomeworkFetching } = useQuery({
    queryKey: ["homework", sessionDate],
    queryFn: async (): Promise<Topic[]> => {
      if (_.isEmpty(uidsArr)) {
        return [];
      }
      const topicsQuery = query(topicsRef, where(documentId(), "in", uidsArr));
      const topicsSnapshot = await getDocs(topicsQuery);
      return topicsSnapshot.docs.map((doc) => doc.data()) as Topic[];
    },
    staleTime: 1000 * 60 * 10, // 10분
  });

  const { data: dateToUidsArrMap } = useQuery<Record<string, string[]> | undefined>({
    queryKey: ["group", groupName],
    queryFn: async (): Promise<Record<string, string[]>> => {
      if (groupName === "") {
        return {};
      }
      const homeworkQuery = query(homeworkRef);
      const querySnapshot = await getDocs(homeworkQuery);
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

  const { data: studentNames } = useQuery<string[] | undefined>({
    queryKey: ["studentNames", groupName],
    queryFn: async (): Promise<string[]> => {
      if (groupName === "") {
        return [];
      }
      const namesQuery = query(groupsRef);
      const querySnapshot = await getDocs(namesQuery);
      let students: string[] = [];
      querySnapshot.forEach((doc) => {
        if (doc.id === groupName) {
          students = doc.data().members;
        }
      });
      return students;
    },
    staleTime: 1000 * 60 * 10, // 10분
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formObject = Object.fromEntries(formData.entries());
    setGroupName(formObject.groupName as string);
  };
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
            _.isEmpty(studentNames)
              ? "invisible max-h-0 overflow-hidden translate-y-2 opacity-50"
              : "visible translate-y-0 opacity-100 transition-all duration-200"
          }`}
        >
          <h4 className="font-medium">숙제 제출 및 열람을 하려면 내 이름을 선택해주세요</h4>
          <div className="w-full flex gap-2 flex-wrap">
            {studentNames?.map((name) => (
              <button
                key={`${groupName}-${name}`}
                className={`rounded-sm px-2 bg-blue-100 ${
                  name === studentName ? "bg-gradient-to-r from-indigo-300 to-blue-300 " : ""
                }hover:bg-gradient-to-r hover:from-indigo-300 hover:to-blue-300`}
                onClick={() => setStudentName(name)}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
        <div
          className={`w-full flex flex-col gap-2 px-2 ${
            _.isEmpty(dateToUidsArrMap)
              ? "invisible max-h-0 overflow-hidden translate-y-2 opacity-50"
              : "visible translate-y-0 opacity-100 transition-all duration-200"
          }`}
        >
          <h4 className="font-medium">수업일을 선택해주세요</h4>
          <div className="w-full flex gap-2 flex-wrap">
            {!_.isEmpty(dateToUidsArrMap) &&
              Object.entries(dateToUidsArrMap).map(([date, keys]) => (
                <button
                  key={date}
                  className={`rounded-sm px-2 bg-blue-100 ${
                    date === sessionDate ? "bg-gradient-to-r from-indigo-300 to-blue-300" : ""
                  } hover:bg-gradient-to-r hover:from-indigo-300 hover:to-blue-300`}
                  onClick={() => {
                    setSessionDate(date);
                    setUidsArr(keys);
                  }}
                >
                  {date}
                </button>
              ))}
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 gap-4">
        {isHomeworkFetching && <p>Loading...</p>}
        {homeworkData?.map(({ uid, category, type, subtype, content }, idx) => (
          <div
            key={uid}
            className="w-full rounded-md p-3 bg-white dark:bg-slate-700 mini-scroll scroll flex flex-col gap-y-1"
          >
            <p className="font-medium">{uid}</p>
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
