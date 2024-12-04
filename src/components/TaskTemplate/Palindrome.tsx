import { FC, useState } from "react";
import styled from "styled-components";

import CodeEditor from "../CodeEditor";

import { TaskTitle } from "../TaskTitle";
import { TaskTemplatePropsType } from "./types";

export const Palindrome: FC<TaskTemplatePropsType> = ({
  variant = "1",
  snowButton,
}) => {
  const initialUserCode = localStorage.getItem(variant);
  const [userCode, setUserCode] = useState(
    initialUserCode
      ? initialUserCode
      : `    
    function  isMagicalPalindrome (holidayString) {
  /* Add your solution here */
}`
  );
  const [result, setResult] = useState<any[]>([""]);
  const [error, setError] = useState("");

  const testData = ["Snow on no wons", "racecar", "Evil elves live", "snowman"];

  const expectedResults = [
    "It is a magical palindrome",
    "It is a magical palindrome",
    "It is not a palindrome. Maybe next time!",
    "It is not a palindrome. Maybe next time!",
  ];

  const handleRunCode = () => {
    setError("");
    try {
      const preparedUserFunction = userCode.split(
        "isMagicalPalindrome (holidayString)"
      )[1];

      const userFunction = new Function("holidayString", preparedUserFunction);
      const testResults = testData.map((data, index) => {
        const output = userFunction(data);
        const isPassed = expectedResults[index] === output;
        return {
          input: data,
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
    "During the festive season, palindrome words or phrases are believed to hold a special kind of holiday magic.",
    " Santa, being a connoisseur of such enchantments, needs your help to identify these magical strings.",
    "Write a function that takes a string and checks if it is a palindrome. The function should handle both single words and phrases, ignoring spaces, punctuation, and case.",
  ];

  const list = [
    'If the input string is a palindrome, return: "It is a magical palindrome"',
    'If not, return: "It is not a palindrome. Maybe next time!"',
  ];

  const comment = "Let's find!";

  const title = "Find magical words";

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
