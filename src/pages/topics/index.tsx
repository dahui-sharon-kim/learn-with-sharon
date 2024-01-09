import React, { useState } from "react";
import { isEmpty } from "lodash";
import { collection, getDocs, query, where, documentId } from "firebase/firestore";
import { db } from "../../firebase";

interface Topic {
  uid: string;
  category: string;
  type: string;
  subtype: string;
  content: string;
}

export default function Topics() {
  const [homeworkData, setHomeworkData] = useState<Topic[]>([]);
  const homeworkRef = collection(db, "homework");
  const homeworkCollection = query(homeworkRef);

  const getHomeworkDataFromKey = async (keyArr: string[]): Promise<Topic[]> => {
    if (isEmpty(keyArr)) {
      return [];
    }
    const topicsRef = collection(db, "topics");
    const topicsQuery = query(topicsRef, where(documentId(), "in", keyArr));
    const topicsQuerySnapshot = await getDocs(topicsQuery);
    return topicsQuerySnapshot.docs.map((doc) => doc.data()) as Topic[];
  };

  const getHomeworkKeyArr = async (name: string, date: string) => {
    let arr: string[] = [];
    const querySnapshot = await getDocs(homeworkCollection);
    querySnapshot.forEach((doc) => {
      if (doc.id === name) {
        arr = Object.entries(doc.data())
          .filter(([dataKey]) => dataKey === date)
          .map(([, dataValue]) => dataValue)[0];
      }
    });
    return arr;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formObject = Object.fromEntries(formData.entries());
    const groupName = formObject.groupName as string;
    const date = formObject.date as string;
    const keyArr = await getHomeworkKeyArr(groupName, date);
    setHomeworkData(await getHomeworkDataFromKey(keyArr));
  };

  return (
    <div className="w-full h-full p-8 max-w-5xl flex flex-col items-center justify-start gap-4">
      <form onSubmit={onSubmit} className="w-full flex flex-col gap-2 border-[1px] border-solid border-slate-400 p-2">
        <h3 className="font-medium">위클리 검색</h3>
        <div className="w-full flex gap-4 flex-wrap">
          <label className="flex gap-2">
            <p className="text-sm">수업일자</p>
            <input className="text-sm" placeholder="YYYYMMDD" name="date" type="text" required />
          </label>
          <label className="flex gap-2">
            <p className="text-sm">스터디 그룹명</p>
            <input className="text-sm" name="groupName" type="text" required />
          </label>
        </div>
        <div className="flex items-center justify-end">
          <button type="submit">
            <p className="text-sm">검색</p>
          </button>
        </div>
      </form>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto">
        {homeworkData.map(({ uid, category, type, subtype, content }, idx) => (
          <div
            key={uid}
            className="w-full [&_p]:text-sm p-3 bg-white dark:bg-slate-700 mini-scroll scroll flex flex-col gap-y-1"
          >
            <p>
              {idx + 1} <span>{category}</span>
            </p>
            <div className="w-full flex gap-x-2 gap-y-1 flex-wrap [&_p]:whitespace-nowrap [&_p]:overflow-ellipsis">
              <div className="w-fit bg-indigo-50 dark:bg-slate-800">
                <p>{type}</p>
              </div>
              <div className="w-fit bg-indigo-50 dark:bg-slate-800">
                <p>{subtype}</p>
              </div>
            </div>
            <p>{content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
