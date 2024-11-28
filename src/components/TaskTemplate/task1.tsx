import { FC, useState } from "react";
import styled from "styled-components";

import CodeEditor from "../CodeEditor";
import { UserDataBlock } from "../UserDataBlock";

import { VariantType } from "../types";
import { TaskTemplatePropsType } from "./types";

export const Task1: FC<TaskTemplatePropsType> = ({}) => {
  const [userCode, setUserCode] = useState(
    `function  checkGiftBudget (budget, giftPrices) {
  /* Add your solution here */
}`
  );

  const [result, setResult] = useState<any[]>([""]);
  const [error, setError] = useState("");

  const [userBudget, setUserBudget] = useState(0);
  const [userPresents, setUserPresents] = useState<number[]>([0]);
  const userTestData = [[userBudget, userPresents]];

  const [isUserData, setIsUserData] = useState(false);
  const [presentCount, setPresentCount] = useState(2);

  const testData = [
    [100, [15, 25, 10, 30, 20]],
    [120, [50, 40, 30, 20, 15]],
    [100, [5, 10, 15, 10, 20]],
    [, [100, 150, 80, 70, 50]],
  ];

  const expectedResults = [
    "Great job! No overspending, no leftovers—just right",
    "Uh-oh, you’re overspending! Try trimming down your expenses.",
    "Looks like you’ve saved money for a little treat for yourself!",
    "Oops! Please provide both your budget and the list of gift prices to continue.",
  ];

  const presentsArr = Array(presentCount).fill(0);

  const addPresent = () => setPresentCount(presentCount + 1);

  const toggleIsUserData = () => {
    setIsUserData(!isUserData);
    setUserBudget(0);
    setUserPresents([]);
    setResult([]);
  };

  const handleRunCode = () => {
    setError("");
    try {
      const preparedUserFunction = userCode.split("(budget, giftPrices)")[1];

      console.log("preparedUserFunction", preparedUserFunction);
      const userFunction = new Function(
        "budget",
        "giftPrices",
        preparedUserFunction
      );

      const preparedTestData = isUserData ? userTestData : testData;

      const testResults = preparedTestData.map((data, index) => {
        const [budget, giftPrices] = data;
        const output = userFunction(budget, giftPrices);
        return {
          input: `budget: ${budget}, giftPrices: [${giftPrices}]`,
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

  const buttonTitle = "Let's Calculate";

  const codeEditor = {
    buttonTitle,
    error,
    handleRunCode,
    isUserData,
    result,
    setUserCode,
    userCode,
  };

  const description = [
    "Every year, as the holiday season approaches, we all become Santa Claus. We search for the best gifts for our loved ones. But to avoid losing our heads in the festive rush, it’s a good idea to calculate ahead of time if the cost of your chosen gifts fits your budget.",
    "So, let’s create a function to help you check if your plans align with your finances. Write a function called checkGiftBudget that takes budget (your total budget) and giftPrices (an array of gift costs) as its arguments.",
    "The function should return one of these messages:",
  ];
  const coments = [
    "Please don’t rename the function or its arguments! Once you're ready, press the button to test if it works.",
    "Afterward, you can click the 'Use My Budget' button, enter your own values, and see if your budget is enough for all the gifts you’re planning to buy. 🎁",
  ];
  const list = [
    '"Great job! No overspending, no leftovers—just right" if the total cost equals your budget.',
    '"Looks like you’ve saved money for a little treat for yourself!" if you have some money left.',
    '"Uh-oh, you’re overspending! Try trimming down your expenses." if the gifts cost more than your budget.',
    '"Uh-oh, you’re overspending! Try trimming down your expenses." if the gifts cost more than your budget.',
    '"Oops! Please provide both your budget and the list of gift prices to continue." if the function takes fewer than 2 arguments.',
  ];

  const title = "Santa’s Budget Assistant";

  const userData = {
    addPresent,
    isUserData,
    presentsArr,
    setUserBudget,
    setUserPresents,
    userBudget,
    toggleIsUserData,
    variant: "1" as VariantType,
  };

  return (
    <>
      <Title>{title}</Title>
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
          {coments &&
            coments.map((text, index) => <Text key={index}>{text}</Text>)}

          {!!userData && <UserDataBlock {...userData} />}
        </Description>
        <CodeEditor {...codeEditor} />
      </Container>
    </>
  );
};

const Title = styled.h1`
  text-shadow: 0 0 10px #4f775d;
  color: #454f47;
  font-size: 70px;
  text-decoration: underline dotted;
  margin-bottom: 20px;
  text-align: center;
`;
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

const Text = styled.p`
  font-size: 1vw;
`;

const List = styled.ul`
  color: #cc322a;
  display: flex;
  flex-direction: column;
  font-size: 1vw;
  gap: 10px;
  padding-left: 30px;
`;
