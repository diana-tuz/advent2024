import { FC } from "react";

import { Task1 } from "./task1";
import { Task2 } from "./task2";
import { Task3 } from "./task3";
import { Task4 } from "./task4";

import { TaskTemplatePropsType } from "./types";

export const TaskTemplate: FC<TaskTemplatePropsType> = ({ variant = "1" }) => {
  const CurrentTask = tasks[variant];
  return <CurrentTask />;
};

const tasks = {
  1: Task1,
  2: Task2,
  3: Task3,
  4: Task4,
};
