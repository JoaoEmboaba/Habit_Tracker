import "./Styles/global.css";
import { Habit } from "./components/Habit";
import "./lib/dayjs";
import { Header } from "./components/header";
import { Table } from "../src/components/table";

export function App() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-5xl px-6 flex-col gap-16">
        <Header />
        <Table />
      </div>
    </div>
  );
}
