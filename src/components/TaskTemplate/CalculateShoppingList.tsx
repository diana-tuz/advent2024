import { FC, useState } from "react";
import styled from "styled-components";

import CodeEditor from "../CodeEditor";

import { TaskTitle } from "../TaskTitle";
import { TaskTemplatePropsType } from "./types";

export const CalculateShoppingList: FC<TaskTemplatePropsType> = ({
  variant = "1",
  snowButton,
}) => {
  const initialUserCode = localStorage.getItem(variant);
  const [userCode, setUserCode] = useState(
    initialUserCode
      ? initialUserCode
      : `function  calculateTotal(shoppingList) {
  /* Add your solution here */
}`
  );
  const [result, setResult] = useState<any[]>([""]);
  const [error, setError] = useState("");

  const expectedResults = [400, 1100, 0, 600];

  const testData = [
    [
      { name: "Gifts", price: 200 },
      { name: "Food", price: 150 },
      { name: "Decorations", price: 50 },
    ],
    [
      { name: "Gifts", price: 500 },
      { name: "Food", price: 200 },
      { name: "Decorations", price: 100 },
      { name: "Travel", price: 300 },
    ],
    [
      { name: "Gifts", price: 0 },
      { name: "Food", price: 0 },
      { name: "Decorations", price: 0 },
    ],
    [
      { name: "Gifts", price: 300 },
      { name: "Food", price: 100 },
      { name: "Decorations", price: 200 },
    ],
  ];

  const handleRunCode = () => {
    setError("");
    try {
      const preparedUserFunction = userCode.split("(shoppingList)")[1];

      const userFunction = new Function("shoppingList", preparedUserFunction);
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
    "The elves are preparing for the holidays, and it's time to check out! The shopping list is ready, with each item having a name and a price.",
    "Your task is to write a function that calculates the total amount of the shopping list.",
    "Given an array of objects, where each object contains an item name and its price, write a function that calculates the total price of all the items on the list.",
  ];
  const list = [
    "The function should take an array of objects as input.",
    "Each object contains two properties: name (a string) and price (a number).",
    "The function should return the total sum of all the prices.",
  ];
  const title = "Holiday shopping checkout";

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
