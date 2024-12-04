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

export const GiftWrappingCommandCenter: FC<TaskTemplatePropsType> = ({
  variant = "1",
  snowButton,
}) => {
  const initialUserCode = localStorage.getItem(variant);
  const [userCode, setUserCode] = useState(
    initialUserCode
      ? initialUserCode
      : `function  processGiftCommand (gift, command) {
  /* Add your solution here */
}`
  );

  const [result, setResult] = useState<any[]>([""]);
  const [error, setError] = useState("");

  const expectedResults = [
    {
      name: "Toy",
      wrapped: true,
      decorated: false,
      content: "Doll",
    },
    {
      name: "Toy Train",
      wrapped: true,
      decorated: true,
      content: "Train",
    },
    "Ready to send!",
    "Not ready yet!",
    {
      name: "Toy",
      wrapped: false,
      decorated: false,
      content: "Ball",
    },
  ];

  const testData = [
    [
      {
        name: "Toy",
        wrapped: false,
        decorated: false,
        content: "Doll",
      },
      "pack",
    ],
    [
      {
        name: "Toy Train",
        wrapped: true,
        decorated: false,
        content: "Train",
      },
      "decorate",
    ],
    [
      {
        name: "Cactus",
        wrapped: true,
        decorated: true,
        content: "Cactus",
      },
      "inspect",
    ],
    [
      {
        name: "Toy",
        wrapped: false,
        decorated: true,
        content: "Plain",
      },
      "inspect",
    ],
    [
      {
        name: "Toy",
        wrapped: true,
        decorated: false,
        content: "Ball",
      },
      "unpack",
    ],
  ];
  const handleRunCode = () => {
    setError("");
    try {
      const preparedUserFunction = userCode.split("(gift, command)")[1];
      console.log({ preparedUserFunction });
      const userFunction = new Function(
        "gift",
        "command",
        preparedUserFunction
      );

      const testResults = testData.map((data, index) => {
        const [gift, command] = data;
        const output = userFunction(gift, command);

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
          input: `gift: ${JSON.stringify(gift)}, command: ${command}`,
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

  const buttonTitle = "Let's do it!";

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
    "In the gift wrapping command center, elves perform various operations on gifts. The elves are given a set of commands to manage the gifts.",
    "The task is to implement a function that processes commands related to wrapping, unpacking, decorating, and inspecting gifts. Each command will alter the gift's state in a specific way.",
    "Tre function should take a gift  { name: string, wrapped: boolean, decorated: boolean, content: string }, and one of command: pack, unpack, decorate, inspect",
    "The commands are as follows:",
  ];

  const list = [
    "pack – Wrap the gift, change wrapped to true ",
    "unpack – Unwrap the gift,  change wrapped to false",
    "decorate – Add decorations to the gift, change decorated to true",
    "inspect – Check the current status of the gift (wrapped, decorated, and content), if current gift have a content, wrapped and decorated, then return: 'Ready to sent!', else - 'Not ready yet!'",
  ];

  const title = "Gift wrapping command center";

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
