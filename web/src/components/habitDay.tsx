import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import * as Checkbox from "@radix-ui/react-checkbox";
import { ProgressBar } from "./ProgressBar";
import { Check } from "phosphor-react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { useState } from "react";
import { HabitsList } from "./HabitsList";

interface HabitDayProps {
  date: Date;
  defaultCompleted?: number;
  amount?: number;
}

export function HabitDay({
  defaultCompleted = 0,
  amount = 0,
  date  
}: HabitDayProps) {
  const [completed, setCompleted] = useState(defaultCompleted);

  const completedPercentage =
    amount > 0 ? Math.round((completed / amount) * 100) : 0;

  const dayAndMonth = dayjs(date).format("DD/MM");
  const dayOfWeek = dayjs(date).format("dddd");

  function handleCompletedChanged(completed: number) {
    setCompleted(completed);
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx(
          "w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg transition-colors hover:border-blue-800",
          {
            "bg-zinc-900 border-zinc-800": completedPercentage === 0,
            "bg-blue-900 border-blue-700":
              completedPercentage > 0 && completedPercentage < 20,
            "bg-blue-800 border-blue-600":
              completedPercentage >= 20 && completedPercentage < 40,
            "bg-blue-700 border-blue-500":
              completedPercentage >= 40 && completedPercentage < 60,
            "bg-blue-600 border-blue-500":
              completedPercentage >= 60 && completedPercentage < 80,
            "bg-blue-500 border-blue-400": completedPercentage >= 80,
          }
        )}
      />

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <span className="font-normal text-zinc-400">{dayOfWeek}</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">
            {dayAndMonth}
          </span>

          <ProgressBar progress={completedPercentage} />

          <HabitsList date={date} onCompletedChanged={handleCompletedChanged} />

          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
