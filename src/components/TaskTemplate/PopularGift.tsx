import { FC, useState } from "react";
import styled from "styled-components";

import CodeEditor from "../CodeEditor";

import { TaskTitle } from "../TaskTitle";
import { TaskTemplatePropsType } from "./types";

export const PopularGift: FC<TaskTemplatePropsType> = ({
  variant = "1",
  snowButton,
}) => {
  const initialUserCode = localStorage.getItem(variant);
  const [userCode, setUserCode] = useState(
    initialUserCode
      ? initialUserCode
      : `    
    function  findMostPopularGift(gifts) {
  /* Add your solution here */
}`
  );
  const [result, setResult] = useState<any[]>([""]);
  const [error, setError] = useState("");

  const testData = [
    [
      "doll",
      "Barbie",
      "robot",
      "car",
      "puzzle",
      "Lego",
      "phone",
      "Barbie",
      "Barbie",
      "car",
      "robot",
    ],
    [
      "smartphone",
      "laptop",
      "tablet",
      "smartwatch",
      "earbuds",
      "tablet",
      "tablet",
      "smartphone",
      "laptop",
      "laptop",
      "smartwatch",
    ],
    [
      "ball",
      "basketball",
      "tennis racket",
      "tennis racket",
      "ball",
      "swimming goggles",
      "basketball",
      "bike",
      "tennis racket",
      "ball",
      "bike",
    ],
    [
      "paint set",
      "sketchbook",
      "watercolors",
      "paint set",
      "puzzle",
      "sketchbook",
      "paint set",
      "canvas",
      "paint set",
      "watercolors",
    ],
  ];

  const expectedResults = [
    "The most popular present 2024 - Barbie",
    "Popular Gifts - laptop, tablet",
    "Popular Gifts - ball, tennis racket",
    "The most popular present 2024 - paint set",
  ];

  const handleRunCode = () => {
    setError("");
    try {
      const preparedUserFunction = userCode.split(
        "findMostPopularGift(gifts)"
      )[1];

      const userFunction = new Function("gifts", preparedUserFunction);
      const testResults = testData.map((data, index) => {
        const output = userFunction(data);
        const isPassed = expectedResults[index] === output;
        return {
          input: `gifts: ${JSON.stringify(data)}`,
          output: JSON.stringify(output),
          expected: expectedResults[index],
          pass: isPassed,
        };
      });
      setResult(testResults);
    } catch (err: any) {
      setError(`Execution Error: ${err.message}`);
    }
  };

  const buttonTitle = "Let’s check";

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
    "This year, Santa has received the list of all the gifts kids want for Christmas. As part of the tradition at the North Pole, they try to determine which gift is the most popular. ",
    "Let's help Santa by implementing a function that will find the most frequently occurring gift in the array.",
    "Your task is to create a function that finds the most popular gift from a list of gift names (strings) and returns a string that announces the result:",
  ];

  const list = [
    'If there is a single most popular gift, return: "The most popular present - <present>"',
    'If there are multiple gifts with the same highest frequency, return: "Popular gifts - <present>, <present>"',
  ];

  const comment = "Let's find!";

  const title = "Find the Most Popular Gift";

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
          <Text>{comment}</Text>
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
