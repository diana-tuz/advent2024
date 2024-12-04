import { FC, useState } from "react";
import styled from "styled-components";

import CodeEditor from "../CodeEditor";

import { TaskTitle } from "../TaskTitle";
import { TaskTemplatePropsType } from "./types";

export const LongestSongTitle: FC<TaskTemplatePropsType> = ({
  variant = "1",
  snowButton,
}) => {
  const initialUserCode = localStorage.getItem(variant);
  const [userCode, setUserCode] = useState(
    initialUserCode
      ? initialUserCode
      : `function  findLongestSongTitle (songTitles) {
  /* Add your solution here */
}`
  );
  const [result, setResult] = useState<any[]>([""]);
  const [error, setError] = useState("");

  const expectedResults = [
    "All I Want for Christmas Is You",
    "Rudolph the Red-Nosed Reindeer",
    "Have Yourself a Merry Little Christmas",
    "Christmas (Baby Please Come Home)",
  ];

  const testData = [
    [
      "Jingle Bells",
      "Silent Night",
      "Frosty the Snowman",
      "All I Want for Christmas Is You",
    ],
    [
      "Let It Snow",
      "Rudolph the Red-Nosed Reindeer",
      "Happy Xmas (War Is Over)",
      "Last Christmas",
    ],
    [
      "Winter Wonderland",
      "Have Yourself a Merry Little Christmas",
      "Rockin' Around the Christmas Tree",
      "Do They Know It’s Christmas?",
    ],
    [
      "Deck the Halls",
      "O Holy Night",
      "Hark! The Herald Angels Sing",
      "Christmas (Baby Please Come Home)",
    ],
  ];

  const handleRunCode = () => {
    setError("");
    try {
      const preparedUserFunction = userCode.split(
        "findLongestSongTitle (songTitles)"
      )[1];

      const userFunction = new Function("songTitles", preparedUserFunction);
      const testResults = testData.map((data, index) => {
        const output = userFunction(data);
        const isPassed = expectedResults[index] === output;
        return {
          input: JSON.stringify(data),
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

  const buttonTitle = "Let’s find";

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
    "Every year, the elves organize a contest to reward the longest song title.",
    "This year, we need to help them find the winner!",
    "Write a function that receives an array of song titles and returns the longest one.",
    "If there are multiple song titles with the same length, return the one that appears first in the array.",
  ];

  const title = "The longest christmas song title";

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

const Description = styled.div`
  background-color: #fcf5efba;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 15px;
  padding: 20px;
`;

const Text = styled.p``;

const Container = styled.div`
  display: flex;
  /* gap: 20px; */
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
