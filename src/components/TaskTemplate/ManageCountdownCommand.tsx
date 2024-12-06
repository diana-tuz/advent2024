import { FC, useState } from "react";
import styled from "styled-components";

import CodeEditor from "../CodeEditor";
import { TaskTitle } from "../TaskTitle";

import { TaskTemplatePropsType } from "./types";

export type RecipeType = {
  name: string;
  cocoa: number;
  milk: number;
  sugar: number;
  marshmallows: number;
};
export type DataType = { cups: number; recipe: RecipeType };

export const ManageCountdownCommand: FC<TaskTemplatePropsType> = ({
  variant = "1",
  snowButton,
}) => {
  const initialUserCode = localStorage.getItem(variant);
  const [userCode, setUserCode] = useState(
    initialUserCode
      ? initialUserCode
      : `function  manageCountdownCommand (command) {
  /* Add your solution here */
}`
  );

  const [result, setResult] = useState<any[]>([""]);
  const [error, setError] = useState("");

  const expectedResults = [
    "The countdown has started! Get ready for the New Year!",
    "Countdown paused. Take a moment to breathe.",
    "Countdown resumed. Back to excitement!",
    "Happy New Year! Let's celebrate!",
    "Countdown stopped. See you next year!",
    "Unknown command. Please try again.",
  ];

  const testData = ["start", "pause", "resume", "celebrate", "stop", "dance"];
  const handleRunCode = () => {
    setError("");
    try {
      const preparedUserFunction = userCode.split(
        "manageCountdownCommand (command)"
      )[1];
      console.log({ preparedUserFunction });
      const userFunction = new Function("command", preparedUserFunction);

      const testResults = testData.map((data, index) => {
        const output = userFunction(data);

        const expected = expectedResults[index];
        let isPassed = output === expected;

        return {
          input: `command: ${data}`,
          output: output,
          expected: expectedResults[index],
          pass: isPassed,
        };
      });

      setResult(testResults);
    } catch (err: any) {
      setError(`Execution Error: ${err.message}`);
    }
  };

  const buttonTitle = "Execute Countdown Command";

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
    "The elves have designed a special control console for managing New Year's celebrations, where each command triggers a specific action.",
    " Write a function that takes a command and executes the corresponding action:",
  ];

  const list = [
    ` "start": Output "The countdown has started! Get ready for the New Year!"`,
    `"pause": Output "Countdown paused. Take a moment to breathe."`,
    `"resume": Output "Countdown resumed. Back to excitement!"`,
    `"stop": Output "Countdown stopped. See you next year!"`,
    `"celebrate": Output "Happy New Year! Let's celebrate!"`,
    `For any other command, output "Unknown command. Please try again."`,
  ];

  const title = "Manage the New Year's Countdown";

  const onSave = () => localStorage.setItem(variant, userCode);
  return (
    <>
      <TaskTitle onSave={onSave} title={title} snowButton={snowButton} />
      <Container>
        <Description>
          {description.map((text, index) => (
            <Text key={index}>{text}</Text>
          ))}
          {list && (
            <List>
              {list.map((text, index) => (
                <li key={index}>{text}</li>
              ))}
            </List>
          )}
        </Description>
        <CodeEditor {...codeEditor} />
      </Container>
    </>
  );
};

const Description = styled.div`
  background-color: #fcf5efba;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 15px;
  padding: 20px;
`;

const Text = styled.p``;

const List = styled.ul`
  color: #cc322a;
  display: flex;
  flex-direction: column;

  gap: 10px;
  padding-left: 30px;
`;
const Container = styled.div`
  display: flex;
  /* gap: 20px; */
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
