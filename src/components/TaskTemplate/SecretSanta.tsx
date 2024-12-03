import { FC, useState } from "react";
import styled from "styled-components";

import CodeEditor from "../CodeEditor";
import { UserDataBlock } from "../UserDataBlock";

import { secretSanta } from "../../constants";
import { TaskTitle } from "../TaskTitle";
import { UserDataVariantType } from "../types";
import { TaskTemplatePropsType } from "./types";

export const SecretSanta: FC<TaskTemplatePropsType> = ({
  variant = "1",
  snowButton,
}) => {
  const initialUserCode = localStorage.getItem(variant);
  const [userCode, setUserCode] = useState(
    initialUserCode
      ? initialUserCode
      : `function  generateSecretSantaPairs (participants) {
  /* Add your solution here */
}`
  );

  const [result, setResult] = useState<any[]>([""]);
  const [error, setError] = useState("");

  const [userTestData, setUserTestData] = useState<string[]>([""]);

  const [isUserData, setIsUserData] = useState(false);
  const [count, setCount] = useState(6);
  const toggleIsUserData = () => {
    setIsUserData(!isUserData);
    setResult([]);
  };
  type PairsType = { santa: string; recipient: string };

  const checkPairs = (pairs: PairsType[], people: string[]) => {
    const isLength = people.length === pairs.length;

    let isValidPairs = true;
    for (let pair of pairs) {
      isValidPairs = isValidPairs && pair.recipient !== pair.santa;
    }

    let isAllPeopleSanta = true;
    let isAllPeopleRecipient = true;
    for (let person of people) {
      isAllPeopleSanta =
        isAllPeopleSanta && pairs.some(({ santa }) => santa === person);
      isAllPeopleRecipient =
        isAllPeopleRecipient &&
        pairs.some(({ recipient }) => recipient === person);
    }

    let pairsError = "";
    const isValidOutput =
      isLength && isValidPairs && isAllPeopleRecipient && isAllPeopleSanta;

    if (!isLength) {
      pairsError = "The number of pairs does not match the number of people.";
    } else if (!isAllPeopleSanta || !isAllPeopleRecipient) {
      pairsError =
        "Every person must appear exactly once as both Santa and recipient.";
    } else if (!isValidPairs) {
      pairsError =
        "Invalid pairing: Santa and recipient should be different people. Fix the list.";
    }

    setError(isValidOutput ? "" : `Execution Error: ${pairsError}`);
    return isValidOutput;
  };
  const addName = () => setCount(count + 1);
  const namesArr = Array(count).fill(0);
  const handleRunCode = () => {
    setError("");
    try {
      const preparedUserFunction = userCode.split("(participants)")[1];

      const userFunction = new Function("participants", preparedUserFunction);
      const testData = isUserData ? userTestData : secretSanta;
      const output = userFunction(testData);
      let isPassed = checkPairs(output, testData);
      const testResults = [
        {
          input: `participants: ${JSON.stringify(testData)}`,
          output: JSON.stringify(output),
          pass: isPassed,
        },
        "", //!DELETE
      ];
      console.log({ testResults });
      setResult(testResults);
    } catch (err: any) {
      setError(`Execution Error: ${err.message}`);
    }
  };

  const buttonTitle = "Let’s generate";

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
    "✨ Let’s get into the holiday spirit and organize a fun Secret Santa game✨",
    "Your task is to create a Secret Santa generator.",
    "  ",
    "The function should:",
  ];

  const list = [
    "Take an array of participants' names (string).",
    "Form unique pairs where each participant becomes someone’s Santa (gift giver) and someone else’s recipient",
    "Return an array of objects, where each object contains: The name of the Santa (the gift giver),The name of the recipient (the person receiving the gift): {santa: <name>, recipient: <name>}",
  ];

  const comment = "Ready to spread some holiday magic? Let’s code! 🎄";

  const title = "Secret Santa";

  const userData = {
    addName,
    isUserData,
    namesArr,
    setUserPresents: setUserTestData,
    toggleIsUserData,
    variant: "11" as UserDataVariantType,
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
          <Text>{comment}</Text>

          {!!userData && <UserDataBlock {...userData} />}
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
