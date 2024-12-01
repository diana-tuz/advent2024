import { FC, useState } from "react";
import styled from "styled-components";

import CodeEditor from "../CodeEditor";
import { UserDataBlock } from "../UserDataBlock";

import { TaskTitle } from "../TaskTitle";
import { UserDataVariantType } from "../types";
import { TaskTemplatePropsType } from "./types";

export const EncryptedLetter: FC<TaskTemplatePropsType> = ({
  variant = "1",
}) => {
  const initialUserCode = localStorage.getItem(variant);
  const [userCode, setUserCode] = useState(
    initialUserCode
      ? initialUserCode
      : `function  encryptLetter (message, shift) {
  /* Add your solution here */
}`
  );

  const [result, setResult] = useState<any[]>([""]);
  const [error, setError] = useState("");

  const [userBudget, setUserBudget] = useState(0);
  const [userPresents, setUserPresents] = useState<number[]>([0]);
  const userTestData = [[userBudget, userPresents]];

  const [isUserData, setIsUserData] = useState(false);

  const testData = [
    ["Santa's workshop", 5],
    ["Zebra Crossing", 3],
    ["Holiday Magic", -7],
    ["Festive Fun!", 10],
    ["Bbb!", -1],
  ];

  const expectedResults = [
    "Xfsyf'x btwpxmtu",
    "Cheud Furvvlqj",
    "Ahebwtr Ftzbv",
    "Pocdsfo Pex!",
    "Aaa!",
  ];

  const toggleIsUserData = () => {
    setIsUserData(!isUserData);
    setUserBudget(0);
    setUserPresents([]);
    setResult([]);
  };

  const handleRunCode = () => {
    setError("");
    try {
      const preparedUserFunction = userCode.split("(message, shift)")[1];

      console.log("preparedUserFunction", preparedUserFunction);
      const userFunction = new Function(
        "message",
        "shift",
        preparedUserFunction
      );

      const preparedTestData = isUserData ? userTestData : testData;

      const testResults = preparedTestData.map((data, index) => {
        const [message, shift] = data;
        const output = userFunction(message, shift);
        return {
          input: `message: ${message}, shift: [${shift}]`,
          output,
          expected: expectedResults[index],
          pass: output === expectedResults[index],
        };
      });

      setResult(testResults);
    } catch (err: any) {
      setError(`Execution Error: ${err.message}`);
    }
  };

  const buttonTitle = "Let’s encrypt it!";

  const codeEditor = {
    buttonTitle,
    error,
    handleRunCode,
    isUserData,
    result,
    setUserCode,
    userCode,
    variant,
  };

  const description = [
    "The festive season is a time for surprises, and Santa needs your help to keep his messages secret! Let's build a simple letter encryption tool using JavaScript to ensure his plans stay confidential.",
    "Create a function called encryptLetter that takes a string (Santa's letter) and encrypts it using a Caesar cipher.",
    " The function should shift each letter by a certain number of positions in the alphabet, wrapping around if necessary (e.g., 'z' becomes 'a').",
  ];
  const comments = [
    "Please don’t rename the function or its arguments! Once you're ready, press the button to test if it works.",
    "Afterward, you can click the 'Use My Budget' button, enter your own values, and see if your budget is enough for all the gifts you’re planning to buy. 🎁",
  ];
  const list = [
    "The function should take two arguments: message (string) – the letter that needs to be encrypted and shift (number) – the number of positions to shift each letter.",

    "Preserve the case of the letters: For example, 'A' becomes 'D' with a shift of 3, and 'a' becomes 'd'.",
    "Non-alphabetic characters (like spaces, punctuation, etc.) should remain unchanged.",
    "If the shift value is negative, the letters should shift to the left.",
  ];

  const title = "Santa’s budget assistant";

  const userData = {
    isUserData,

    setUserBudget,
    setUserPresents,
    userBudget,
    toggleIsUserData,
    variant: variant as UserDataVariantType,
  };

  const onSave = () => localStorage.setItem(variant, userCode);

  return (
    <>
      <TaskTitle onSave={onSave} title={title} />
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
          {comments &&
            comments.map((text, index) => <Text key={index}>{text}</Text>)}

          {!!userData && <UserDataBlock {...userData} />}
        </Description>
        <CodeEditor {...codeEditor} />
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  /* gap: 20px; */
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
