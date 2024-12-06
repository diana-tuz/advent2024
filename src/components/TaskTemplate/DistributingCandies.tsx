import { FC, useState } from "react";
import styled from "styled-components";

import CodeEditor from "../CodeEditor";

import { TaskTitle } from "../TaskTitle";
import { TaskTemplatePropsType } from "./types";

export const DistributingCandies: FC<TaskTemplatePropsType> = ({
  variant = "1",
  snowButton,
}) => {
  const initialUserCode = localStorage.getItem(variant);
  const [userCode, setUserCode] = useState(
    initialUserCode
      ? initialUserCode
      : `    
    function  distributeCandies (totalCandies, giftCount) {
  /* Add your solution here */
}`
  );
  const [result, setResult] = useState<any[]>([""]);
  const [error, setError] = useState("");

  const testData = [
    [27000, 40000],
    [200000, 40000],
    [567000, 233000],
    [120002, 40000],
  ];

  const expectedResults = [
    "Not enough candies to distribute among the gifts.",
    "Each gift will get 5 candies.",
    "Each gift will get 2 candies. 101000 candies will remain for the elves.",
    "Each gift will get 3 candies. 2 candies will remain for the elves.",
  ];

  const handleRunCode = () => {
    setError("");
    try {
      const preparedUserFunction = userCode.split(
        "(totalCandies, giftCount)"
      )[1];

      const userFunction = new Function(
        "totalCandies",
        "giftCount",
        preparedUserFunction
      );
      const testResults = testData.map((data, index) => {
        const [totalCandies, giftCount] = data;

        const output = userFunction(totalCandies, giftCount);

        const isPassed = expectedResults[index] === output;
        return {
          input: `totalCandies: ${totalCandies}, giftCount: ${giftCount}`,
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
    " In the North Pole's candy workshop, elves need to pack candy into gifts. However, they cannot divide the candies, so they need to determine how many candies each gift will get. ",
    "The function should calculate the number of candies to be placed in each gift. If there are remaining candies, it should return a message showing how many candies go into each gift and how many are left. ",
    "The number of candies should be rounded down to the nearest whole number.",
  ];

  const list = [
    'If there are leftover candies, the function will return: "Each gift will get <number> candies. <remaining> candies will remain for the elves."',
    'If there are no leftover candies, the function will return: "Each gift will get <number> candies."',
    'If there are less than 1 candy per present, the function will return: "Not enough candies to distribute among the gifts."',
  ];

  const comment = "Let's find!";

  const title = "Distributing candies";

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
