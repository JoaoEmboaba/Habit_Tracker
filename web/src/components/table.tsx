import dayjs from "dayjs";
import { response } from "express";
import { SelectionSlash } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { generateDatesFromYearBeginning } from "../utils/generate-range-between-dates";
import { HabitDay } from "./habitDay";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const summaryDates = generateDatesFromYearBeginning();

const minimumSummaryDatesSize = 18 * 7;
let amountOfDaysTofill = minimumSummaryDatesSize - summaryDates.length;

console.log(summaryDates);

type Summary = {
  id: string;
  date: string;
  amount: number;
  completed: number;
}[];

export function Table() {
  const [summary, setSummary] = useState<Summary>([]);

  useEffect(() => {
    api.get("summary").then((response) => {
      setSummary(response.data);
    });
  }, []);

  return (
    <div className="w-full mt-28 flex">
      <div className="grid grid-rows-7 font-bold grid-flow-row gap-3">
        {weekDays.map((weekDays, i) => {
          return (
            <div
              key={`${weekDays}-${i}`}
              className="text-zinc-400 text-xl h-10 w-10 flex items-center justify-center"
            >
              {weekDays}
            </div>
          );
        })}
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summary.length > 0 &&
          summaryDates.map((date) => {
            const dayInSummary = summary.find((day) => {
              return dayjs(date).isSame(day.date, "day");
            });

            return (
              <HabitDay
                date={date}
                amount={dayInSummary?.amount}
                defaultCompleted={dayInSummary?.completed}
                key={date.toString()}
              />
            );
          })}

        {amountOfDaysTofill > 0 &&
          Array.from({ length: amountOfDaysTofill }).map((_, i) => {
            return (
              <div
                key={i}
                className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
              />
            );
          })}
      </div>
    </div>
  );
}
