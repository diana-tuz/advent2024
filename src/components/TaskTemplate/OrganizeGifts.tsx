import { FC, useState } from "react";
import styled from "styled-components";

import CodeEditor from "../CodeEditor";
import { TaskTitle } from "../TaskTitle";

import { objectsEqual } from "../tools";
import { TaskTemplatePropsType } from "./types";

export const OrganizeGifts: FC<TaskTemplatePropsType> = ({ variant = "1" }) => {
  const initialUserCode = localStorage.getItem(variant);
  const [userCode, setUserCode] = useState(
    initialUserCode
      ? initialUserCode
      : `function  organizeGifts (giftsList) {
  /* Add your solution here */
}`
  );
  type ResultType = {
    [key: string]: { totalItems: number; totalValue: number };
  };

  const [result, setResult] = useState<any[]>([""]);
  const [error, setError] = useState("");

  const testData = [
    [
      { name: "Toy Car", category: "Toys", price: 15, quantity: 10 },
      { name: "Board Game", category: "Toys", price: 20, quantity: 5 },
      { name: "Scarf", category: "Clothing", price: 10, quantity: 8 },
      { name: "Sweater", category: "Clothing", price: 25, quantity: 2 },
      { name: "Chocolate", category: "Food", price: 5, quantity: 50 },
    ],
    [],
    [
      { name: "Board Game", category: "Toys", price: 20, quantity: 0 },
      { name: "Scarf", category: "Jewelry", price: 1200, quantity: 8 },
      { name: "Sweater", category: "Clothing", price: 25, quantity: 2 },
      { name: "Chocolate", category: "Food", price: 5, quantity: 50 },
      { name: "Candle" },
    ],
    [
      { name: "Toy Car", category: "Toys", price: 15, quantity: 10 },
      { name: "Board Game", category: "Toys", price: 20, quantity: 5 },
      { name: "Action Figure", category: "Toys", price: 25, quantity: 7 },
    ],
  ];

  const expectedResults: (ResultType | string)[] = [
    {
      Toys: { totalItems: 15, totalValue: 250 },
      Clothing: { totalItems: 10, totalValue: 130 },
      Food: { totalItems: 50, totalValue: 250 },
    },
    "The gift shop is empty! Time to restock!",
    {
      Jevelry: { totalItems: 8, totalValue: 9600 },
      Clothing: { totalItems: 2, totalValue: 50 },
      Food: { totalItems: 50, totalValue: 250 },
    },
    {
      Toys: { totalItems: 22, totalValue: 425 },
    },
  ];

  const handleRunCode = () => {
    setError("");
    try {
      const preparedUserFunction = userCode.split("(giftsList)")[1];

      const userFunction = new Function("giftsList", preparedUserFunction);

      const preparedTestData = testData;

      const testResults = preparedTestData.map((data, index) => {
        const output = userFunction(data);
        let isPassed;
        const expected = expectedResults[index];

        if (typeof output === "object" && output !== null) {
          isPassed = objectsEqual(expected, output);
        } else if (typeof output === "string" && output === expected) {
          isPassed = true;
        } else {
          isPassed = false;
        }

        return {
          input: `giftsList: ${JSON.stringify(data)}`,
          output: JSON.stringify(output),
          expected: JSON.stringify(expectedResults[index]),
          pass: isPassed,
        };
      });

      setResult(testResults);
    } catch (err: any) {
      setError(`Execution Error: ${err.message}`);
    }
  };

  const buttonTitle = "Let's organize our gifts";

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
    "Our gift shop is always busy during the holiday season. Let’s prepare by organizing our gifts. Write a function to help us sort and categorize them.",
    "Create a function organizeGifts that takes giftsList - an array of gifts 🎁.",
    "Each gift is an object with the following properties:",
  ];
  const comments = ["The function should:"];
  const argslist = [
    "name (string): the name of the gift",
    "category (string): the category of the gift",
    "price (number): the price of a single unit of the gift",
    "quantity (number): the number of units available in stock.",
  ];
  const list = [
    "Return an object where each key is a category name, and each value is an object containing the total quantity of items (totalItems) and their combined cost (totalValue)",
    "If the input array is empty, return: 'The gift shop is empty! Time to restock!'.",
    "Skip any gifts with a quantity of 0 (already sold out).",
  ];
  const title = "Gift Shop";
  const onSave = () => localStorage.setItem(variant, userCode);
  return (
    <>
      <TaskTitle onSave={onSave} title={title} />
      <Container>
        <Description>
          {description.map((text, index) => (
            <Text key={index}>{text}</Text>
          ))}
          <List>
            {argslist.map((text, index) => (
              <li key={index}>{text}</li>
            ))}
          </List>
          {comments &&
            comments.map((text, index) => <Text key={index}>{text}</Text>)}
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
