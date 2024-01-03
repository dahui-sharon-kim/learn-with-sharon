import data from "../../mock/mockData.json?raw";

export default function Homework() {
  console.log(JSON.parse(data));
  return <div className="text-3xl text-blue-500">Hello, world!</div>;
}
