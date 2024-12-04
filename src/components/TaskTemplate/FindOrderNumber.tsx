import { FC, useState } from "react";
import styled from "styled-components";

import CodeEditor from "../CodeEditor";

import { TaskTitle } from "../TaskTitle";
import { TaskTemplatePropsType } from "./types";

export const FindOrderNumber: FC<TaskTemplatePropsType> = ({
  variant = "1",
  snowButton,
}) => {
  const initialUserCode = localStorage.getItem(variant);
  const [userCode, setUserCode] = useState(
    initialUserCode
      ? initialUserCode
      : `function  findOrderNumber(orders, targetAmount) {
  /* Add your solution here */
}`
  );
  const [result, setResult] = useState<any[]>([""]);
  const [error, setError] = useState("");
  const expectedResults = ["B456", "C789", "Order not found", "X002"];

  const testData = [
    [
      [
        { orderNumber: "A123", amount: 100 },
        { orderNumber: "B456", amount: 250 },
        { orderNumber: "C789", amount: 50 },
      ],
      250,
    ],
    [
      [
        { orderNumber: "A123", amount: 100 },
        { orderNumber: "B456", amount: 250 },
        { orderNumber: "C789", amount: 50 },
      ],
      50,
    ],
    [
      [
        { orderNumber: "A123", amount: 100 },
        { orderNumber: "B456", amount: 250 },
        { orderNumber: "C789", amount: 50 },
      ],
      300,
    ],
    [
      [
        { orderNumber: "X001", amount: 400 },
        { orderNumber: "X002", amount: 150 },
        { orderNumber: "X003", amount: 500 },
      ],
      150,
    ],
  ];

  const handleRunCode = () => {
    setError("");
    try {
      const preparedUserFunction = userCode.split("(orders, targetAmount)")[1];

      const userFunction = new Function(
        "orders",
        "targetAmount",
        preparedUserFunction
      );
      const testResults = testData.map((data, index) => {
        const [orders, targetAmount] = data;
        const output = userFunction(orders, targetAmount);
        const isPassed = expectedResults[index] === output;
        return {
          input: `orders: ${JSON.stringify(
            orders
          )}, targetAmount: ${targetAmount} `,
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
    "A hurricane has hit the store, and all the orders have been mixed up! ",
    "Each order has an order number and an amount. Your task is to write a function that, given a list of orders, finds the order number corresponding to a given amount.",

    "The function should:",
  ];
  const list = [
    "Accept an array of objects, where each object contains an orderNumber (a string or number) and an amount (a number).",
    "The function should take a second argument, the targetAmount, and return the orderNumber of the order that matches the target amount.",
    'If no order matches the target amount, return "Order not found".',
  ];
  const title = "Count the occurrences of a word in a holiday story";

  const onSave = () => localStorage.setItem(variant, userCode);

  return (
    <>
      <TaskTitle onSave={onSave} title={title} snowButton={snowButton} />
      <Container>
        <Description>
          {description.map((text, index) => (
            <Text key={index}>{text}</Text>
          ))}{" "}
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

const Container = styled.div`
  display: flex;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
const List = styled.ul`
  color: #cc322a;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 30px;
`;
