import { FC, useState } from "react";
import styled from "styled-components";

import CodeEditor from "../CodeEditor";
import { TaskTitle } from "../TaskTitle";

import { objectsEqual } from "../tools";

import { TaskTemplatePropsType } from "./types";

export type RecipeType = {
  name: string;
  cocoa: number;
  milk: number;
  sugar: number;
  marshmallows: number;
};
export type DataType = { cups: number; recipe: RecipeType };

export const FilterTasks: FC<TaskTemplatePropsType> = ({
  variant = "1",
  snowButton,
}) => {
  const initialUserCode = localStorage.getItem(variant);
  const [userCode, setUserCode] = useState(
    initialUserCode
      ? initialUserCode
      : `function  filterHolidayTasks  (tasks) {
  /* Add your solution here */
}`
  );

  const [result, setResult] = useState<any[]>([""]);
  const [error, setError] = useState("");

  const testData = [
    [
      { title: "Decorate the Christmas tree", theme: "holiday" },
      { title: "Bake gingerbread cookies", theme: "holiday" },
      { title: "Clean the living room", theme: "cleaning" },
      { title: "Hang holiday lights", theme: "holiday" },
      { title: "Fix the broken chair", theme: "home maintenance" },
      { title: "Go grocery shopping", theme: "shopping" },
      { title: "Watch a Christmas movie", theme: "holiday" },
      { title: "Plan holiday dinner", theme: "holiday" },
      { title: "Shovel snow from the driveway", theme: "outdoor chores" },
      { title: "Wrap gifts", theme: "holiday" },
      { title: "Organize the garage", theme: "organization" },
      { title: "Trim the bushes in the garden", theme: "gardening" },
      { title: "Sort old magazines", theme: "organization" },
      { title: "Paint the fence", theme: "home maintenance" },
      { title: "Dust the shelves", theme: "cleaning" },
    ],
    [
      { title: "Clean the living room", theme: "cleaning" },
      { title: "Fix the broken chair", theme: "home maintenance" },
      { title: "Go grocery shopping", theme: "shopping" },
      { title: "Shovel snow from the driveway", theme: "outdoor chores" },
      { title: "Organize the garage", theme: "organization" },
      { title: "Trim the bushes in the garden", theme: "gardening" },
      { title: "Sort old magazines", theme: "organization" },
      { title: "Paint the fence", theme: "home maintenance" },
      { title: "Dust the shelves", theme: "cleaning" },
    ],
    [
      { title: "Prepare the fireplace", theme: "holiday" },
      { title: "Put up the mistletoe", theme: "holiday" },
      { title: "Wash the car", theme: "car maintenance" },
      { title: "Host a holiday party", theme: "holiday" },
      { title: "Vacuum the carpet", theme: "cleaning" },
      { title: "Make holiday-themed crafts", theme: "holiday" },
      { title: "Repair the fence", theme: "home maintenance" },
      { title: "Write a New Year’s resolution list", theme: "holiday" },
      { title: "Sort old clothes for donation", theme: "organization" },
      { title: "Send holiday invitations", theme: "holiday" },
      { title: "Clean the bathroom", theme: "cleaning" },
      { title: "Prepare hot cocoa for guests", theme: "holiday" },
      { title: "Inspect the heater for winter", theme: "home maintenance" },
      { title: "Organize a bookshelf", theme: "organization" },
      { title: "Decorate the front porch", theme: "holiday" },
    ],
  ];

  const expectedResults = [
    [
      { title: "Decorate the Christmas tree", theme: "holiday" },
      { title: "Bake gingerbread cookies", theme: "holiday" },
      { title: "Hang holiday lights", theme: "holiday" },
      { title: "Watch a Christmas movie", theme: "holiday" },
      { title: "Plan holiday dinner", theme: "holiday" },
      { title: "Wrap gifts", theme: "holiday" },
    ],
    "Oops, it seems you don't have any holiday tasks!",
    [
      { title: "Prepare the fireplace", theme: "holiday" },
      { title: "Put up the mistletoe", theme: "holiday" },
      { title: "Host a holiday party", theme: "holiday" },
      { title: "Make holiday-themed crafts", theme: "holiday" },
      { title: "Write a New Year’s resolution list", theme: "holiday" },
      { title: "Send holiday invitations", theme: "holiday" },
      { title: "Prepare hot cocoa for guests", theme: "holiday" },
      { title: "Decorate the front porch", theme: "holiday" },
    ],
  ];

  const handleRunCode = () => {
    setError("");
    try {
      const preparedUserFunction = userCode.split("(tasks)")[1];

      const userFunction = new Function("tasks", preparedUserFunction);

      const testResults = testData.map((data, index) => {
        const output = userFunction(data);

        let isPassed;
        const expected = expectedResults[index];

        if (typeof output === "object" && output !== null) {
          isPassed = objectsEqual(expected, output);
        } else if (typeof output === "string" && output === expected) {
          isPassed = true;
        } else {
          isPassed = false;
        }

        return {
          input: `tasks: ${JSON.stringify(data)}`,
          output: JSON.stringify(output),
          expected: JSON.stringify(expectedResults[index]),
          pass: isPassed,
        };
      });

      setResult(testResults);
    } catch (err: any) {
      setError(`Execution Error: ${err.message}`);
    }
  };

  const buttonTitle = "Let's find";

  const codeEditor = {
    buttonTitle,
    error,
    handleRunCode,
    result,
    setUserCode,
    userCode,
    variant,
  };

  const description = [
    "Winter time is the season for winter tasks!",
    "We have a list of weekend tasks. Each task is an object that contains a title and a theme. Let’s filter these tasks to get only those with the theme holiday.",
    'You need to implement a function that takes an array of tasks - {name: string, theme: string} and returns only those with the theme "holiday"',
    `If your array doesn't have any holiday tasks, return: "Oops, it seems you don't have any holiday tasks!"`,
  ];

  const title = "Filter Out Holiday Tasks";

  const onSave = () => localStorage.setItem(variant, userCode);

  return (
    <>
      <TaskTitle onSave={onSave} title={title} snowButton={snowButton} />
      <Container>
        <Description>
          {description.map((text, index) => (
            <Text key={index}>{text}</Text>
          ))}
        </Description>
        <CodeEditor {...codeEditor} />
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const Description = styled.div`
  background-color: #fcf5efba;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 15px;
  padding: 20px;
`;

const Text = styled.p``;
