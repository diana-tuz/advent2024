import { FC, useState } from "react";
import styled from "styled-components";

import CodeEditor from "../CodeEditor";
import { TaskTitle } from "../TaskTitle";
import { UserDataBlock } from "../UserDataBlock";

import { objectsEqual } from "../tools";

import { UserDataVariantType } from "../types";
import { TaskTemplatePropsType } from "./types";

export type RecipeType = {
  name: string;
  cocoa: number;
  milk: number;
  sugar: number;
  marshmallows: number;
};
export type DataType = { cups: number; recipe: RecipeType };

export const CocoaCraft: FC<TaskTemplatePropsType> = ({ variant = "1" }) => {
  const initialUserCode = localStorage.getItem(variant);
  const [userCode, setUserCode] = useState(
    initialUserCode
      ? initialUserCode
      : `function  cocoaCraft (cups, recipe) {
  /* Add your solution here */
}`
  );
  const initialRecipe = {
    name: "",
    cocoa: 0,
    milk: 0,
    sugar: 0,
    marshmallows: 0,
  };
  const [result, setResult] = useState<any[]>([""]);
  const [error, setError] = useState("");

  const [isUserData, setIsUserData] = useState(false);
  const [userCups, setUserCups] = useState<number>(0);
  const [userRecipe, setUserRecipe] = useState<RecipeType>(initialRecipe);
  const userTestData = [[userCups, userRecipe]];
  const testData = [
    [
      3,
      {
        name: "Classic Cocoa",
        cocoa: 10,
        milk: 200,
        sugar: 15,
        marshmallows: 5,
      },
    ],
    [
      0,
      {
        name: "Simple Cocoa",
        cocoa: 15,
        milk: 300,
        sugar: 20,
        marshmallows: 10,
      },
    ],
    [
      2,
      {
        name: "Gourmet Cocoa",
        cocoa: 20,
        milk: 250,
        sugar: 10,
        marshmallows: 7,
      },
    ],

    [4, {}],
  ];

  const expectedResults = [
    {
      name: "Classic Cocoa",
      cocoa: 30,
      milk: 600,
      sugar: 45,
      marshmallows: 15,
    },
    "Invalid input. Please provide a valid number of cups.",
    {
      name: "Gourmet Cocoa",
      cocoa: 40,
      milk: 500,
      sugar: 20,
      marshmallows: 14,
    },
    "Invalid input. Please provide a valid recipe.",
  ];
  console.log("userTestData", userTestData);
  const handleRunCode = () => {
    setError("");
    try {
      const preparedUserFunction = userCode.split("(cups, recipe)")[1];

      const userFunction = new Function("cups", "recipe", preparedUserFunction);

      const preparedTestData = isUserData ? userTestData : testData;

      const testResults = preparedTestData.map((data, index) => {
        const [cups, recipe] = data;
        const output = userFunction(cups, recipe);

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
          input: `cups: ${cups}, giftPrices: [${JSON.stringify(recipe)}]`,
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

  const buttonTitle = "Let's calculate 🌟";

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
    "Winter evenings are perfect for sipping on some hot cocoa! But how much of each ingredient do you need?",
    "Let’s build a function to find out!",
    "Write a function calculateIngredients(recipe, cups) that:",
    "1. Accepts two arguments:",
  ];

  const comments = [
    "Returns an object with the total amount of each ingredient needed for the specified number of cups.",
    'If the number of cups is invalid (e.g., zero, negative, or not a number), returns a string: "Invalid input. Please provide a valid number of cups."',
    'If the recipe is invalid (e.g., missing ingredients, zero, negative values, or non-numeric values), return the string: "Invalid input. Please provide a valid recipe."',
  ];

  const list = [
    "cups: the number of cups you want to make",
    "recipe: an object containing the name of the recipe and the amount of each ingredient required per cup (e.g., cocoa, milk, sugar, marshmallows)",
  ];

  const title = "Hot cocoa recipe helper";

  const toggleIsUserData = () => {
    setIsUserData(!isUserData);
    setUserCups(0);
    setUserRecipe(initialRecipe);
    setResult([]);
  };

  const userData = {
    isUserData,
    toggleIsUserData,
    variant: variant as UserDataVariantType,
    ingredients: Object.keys(initialRecipe),
    userCups,
    setUserCups,
    setUserRecipe,
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
