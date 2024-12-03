import { FC, useState } from "react";
import styled from "styled-components";

import CodeEditor from "../CodeEditor";
import { UserDataBlock } from "../UserDataBlock";

import { predictions } from "../../constants";
import { TaskTitle } from "../TaskTitle";
import { UserDataVariantType } from "../types";
import { TaskTemplatePropsType } from "./types";

export const GeneratePrediction: FC<TaskTemplatePropsType> = ({
  variant = "1",
  snowButton,
}) => {
  const initialUserCode = localStorage.getItem(variant);
  const [userCode, setUserCode] = useState(
    initialUserCode
      ? initialUserCode
      : `function  generatePrediction (predictions, recipient) {
  /* Add your solution here */
}`
  );

  const [result, setResult] = useState<any[]>([""]);
  const [error, setError] = useState("");

  const [userRecipient, setUserRecipient] = useState<string>("");
  const userTestData = [[predictions, userRecipient]];

  const [isUserData, setIsUserData] = useState(false);

  const testData = [
    [predictions, "Jenny"],
    [predictions, "Ira"],
    [predictions, "Capricornus"],
    [predictions],
  ];

  const checkPhrase = (phrase: string, recipient?: string): boolean => {
    const currentRecipient = recipient ? recipient : "you";

    const regex = new RegExp(`\\b${currentRecipient}\\b[.,!?;]*`, "g");

    const isValidName = regex.test(phrase);

    const restorePhrase = phrase.replace(currentRecipient, "{recipient}");

    const isValidPhrase = predictions.some(
      (prediction) => prediction === restorePhrase
    );

    return isValidName && isValidPhrase;
  };

  const toggleIsUserData = () => {
    setIsUserData(!isUserData);
    setResult([]);
  };

  const handleRunCode = () => {
    setError("");
    try {
      const preparedUserFunction = userCode.split(
        "(predictions, recipient)"
      )[1];

      const userFunction = new Function(
        "predictions",
        "recipient",
        preparedUserFunction
      );
      const preparedTestData = isUserData ? userTestData : testData;

      const testResults = preparedTestData.map((data) => {
        const [predictions, recipient] = data;
        const output = userFunction(predictions, recipient);
        let isPassed = checkPhrase(output, recipient as string);
        return {
          input: `predictions[]${recipient ? `, recipient: ${recipient}` : ""}`,
          output,
          pass: isPassed,
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
    "✨ 2025 is just around the corner! ✨",
    "Curious about what the stars have in store for you? Let’s uncover your fate with a personalized prediction! ",
    "  ",
    "Create function generatePrediction: ",
  ];

  const list = [
    'the function should take two arguments: predictions: An array of prediction strings that include a placeholder "{recipient}" and recipient(optional): A string representing the zodiac sign or name of the person the prediction is for.',
    'If the recipient is provided, it should replace the "{recipient}" placeholder in the prediction with the value of the recipient.',
    'If no recipient is provided, it should replace "{recipient}" with "you".',
  ];

  const title = "Prophecy matcher";

  const userData = {
    isUserData,
    setUserRecipient,
    userRecipient,
    toggleIsUserData,
    variant: "10" as UserDataVariantType,
  };

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
