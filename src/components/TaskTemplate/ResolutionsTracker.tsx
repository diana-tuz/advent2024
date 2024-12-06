import { FC, useState } from "react";
import styled from "styled-components";

import CodeEditor from "../CodeEditor";
import { TaskTitle } from "../TaskTitle";

import { TaskTemplatePropsType } from "./types";

export const ResolutionsTracker: FC<TaskTemplatePropsType> = ({
  variant = "1",
  snowButton,
}) => {
  const initialUserCode = localStorage.getItem(variant);
  const [userCode, setUserCode] = useState(
    initialUserCode
      ? initialUserCode
      : `function  manageResolutions (resolutions, command, data) {
  /* Add your solution here */
}`
  );
  const [result, setResult] = useState<any[]>([""]);
  const [error, setError] = useState("");

  const expectedResults = [
    [
      { name: "Exercise more", status: "pending" },
      { name: "Read 12 books", status: "in-progress" },
      { name: "Learn JavaScript", status: "completed" },
      { name: "Save money", status: "pending" },
    ],
    [
      { name: "Exercise more", status: "completed" },
      { name: "Read 12 books", status: "in-progress" },
      { name: "Learn JavaScript", status: "completed" },
    ],
    [
      { name: "Exercise more", status: "pending" },
      { name: "Learn JavaScript", status: "completed" },
    ],
    "Resolution not found: Start a blog.",
    "Resolution not found: Start a blog.",
  ];

  const resolutions = [
    { name: "Exercise more", status: "pending" },
    { name: "Read 12 books", status: "in-progress" },
    { name: "Learn JavaScript", status: "completed" },
  ];

  const testData = [
    [resolutions, "add", "Save money"],
    [resolutions, "complete", "Exercise more"],
    [resolutions, "delete", "Read 12 books"],
    [resolutions, "complete", "Start a blog"],
    [resolutions, "delete", "Start a blog"],
  ];

  const handleRunCode = () => {
    setError("");
    try {
      const preparedUserFunction = userCode.split(
        "(resolutions, command, data)"
      )[1];
      console.log({ preparedUserFunction });
      const userFunction = new Function(
        "resolutions",
        "command",
        "data",
        preparedUserFunction
      );

      const testResults = testData.map((dataItem, index) => {
        const [resolutions, command, data] = dataItem;
        const output = userFunction(resolutions, command, data && data);

        const expected = expectedResults[index];
        let isPassed = JSON.stringify(output) === JSON.stringify(expected);

        return {
          input: `resolutions: ${JSON.stringify(
            resolutions
          )}, command: ${command}, ${
            data ? `resolutions: ${JSON.stringify(resolutions)}` : ""
          },`,
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

  const buttonTitle = "Run Resolutions Command";

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
    `The elves want to help people stick to their New Year's resolutions.`,
    "You need to write a function that manages a list of New Year's resolutions. ",
    "The function will take a list of resolutions, a command, and the name of a resolution. It performs one of the following actions:",
  ];

  const list = [
    `add: Adds a new resolution with a status of "pending". If the resolution already exists, return "Resolution already exists: [resolution name].".`,
    `complete: Marks the resolution as "completed". If the resolution is not found, return "Resolution not found: [resolution name].".`,
    `delete: Removes the resolution from the list. If the resolution is not found, return "Resolution not found: [resolution name].".`,
  ];

  const comment =
    "The function should return the updated list of resolutions if the command is valid and successfully executed. Otherwise, it should return the corresponding error message as a string.";

  const title = " New Year's Resolutions Tracker";

  const onSave = () => localStorage.setItem(variant, userCode);
  return (
    <>
      <TaskTitle onSave={onSave} title={title} snowButton={snowButton} />
      <Container>
        <Description>
          {description.map((text, index) => (
            <Text key={index}>{text}</Text>
          ))}

          <List>
            {list.map((text, index) => (
              <li key={index}>{text}</li>
            ))}
          </List>

          <Text>{comment}</Text>
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

const List = styled.ul`
  color: #cc322a;
  display: flex;
  flex-direction: column;

  gap: 10px;
  padding-left: 30px;
`;
