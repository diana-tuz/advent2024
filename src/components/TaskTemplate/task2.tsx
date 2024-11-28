import { FC, useState } from "react";
import styled from "styled-components";

import CodeEditor from "../CodeEditor";

import { arraysAreEqual } from "../tools";
import { TaskTemplatePropsType } from "./types";

export const Task2: FC<TaskTemplatePropsType> = ({}) => {
  const [userCode, setUserCode] = useState(
    `function  niceOrNaughty (threshold, children) {
  /* Add your solution here */
}`
  );
  type ResultType = { niceList: string[]; naughtyList: string[] };
  const [result, setResult] = useState<any[]>([""]);
  const [error, setError] = useState("");

  const testData = [
    [
      4,
      [
        {
          name: "Alice",
          goodDeeds: 10,
          badDeeds: 5,
        },
        {
          name: "Bob",
          goodDeeds: 3,
          badDeeds: 8,
        },
        {
          name: "Charlie",
          goodDeeds: 7,
          badDeeds: 7,
        },
        {
          name: "Daisy",
          goodDeeds: 12,
          badDeeds: 2,
        },
        {
          name: "Eve",
          goodDeeds: 5,
          badDeeds: 1,
        },
        {
          name: "Frank",
          goodDeeds: 0,
          badDeeds: 0,
        },
      ],
    ],
    [5, []],
    [
      20,
      [
        {
          name: "Anna",
          goodDeeds: 60,
          badDeeds: 60,
        },
        {
          name: "Ben",
          goodDeeds: 44,
          badDeeds: 44,
        },
      ],
    ],
  ];

  const expectedResults: (ResultType | string)[] = [
    {
      niceList: ["Alice", "Daisy", "Eve"],
      naughtyList: ["Bob", "Charlie", "Frank"],
    },
    "Santa has no children to check!",
    {
      niceList: [],
      naughtyList: ["Anna", "Ben"],
    },
  ];

  const handleRunCode = () => {
    setError("");
    try {
      const preparedUserFunction = userCode.split("(threshold, children)")[1];

      console.log("preparedUserFunction", preparedUserFunction);
      const userFunction = new Function(
        "threshold",
        "children",
        preparedUserFunction
      );

      const testResults = testData.map((data, index) => {
        const [threshold, children] = data;
        const output = userFunction(threshold, children);

        let isPassed;
        if (typeof output === "object" && output !== null) {
          const expected = expectedResults[index] as ResultType;
          isPassed =
            arraysAreEqual(output.niceList, expected.niceList) &&
            arraysAreEqual(output.naughtyList, expected.naughtyList);
        } else if (
          typeof output === "string" &&
          output === expectedResults[index]
        ) {
          isPassed = true;
        } else {
          isPassed = false;
        }

        return {
          input: `threshold: ${threshold}, children: ${JSON.stringify(
            children
          )}`,
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

  const buttonTitle = "Let's check";

  const codeEditor = {
    buttonTitle,
    error,
    handleRunCode,
    result,
    setUserCode,
    userCode,
  };

  const description = [
    "Santa has received a list of children, and now he needs to decide who goes on the Nice List and who ends up on the Naughty List.",
    "Write a function called niceOrNaughty that takes two arguments:",
  ];

  const list = [
    "threshold (a number): the minimum kindness score a child needs to make it onto the Nice List.",
    "children (an array of child objects). Each child is represented as an object with the name (string), goodDeeds (number): the number of good deeds the child has done, badDeeds (number): the number of bad deeds the child has done.",
  ];
  const functionTitle = "The function should:";
  const functionList = [
    "Calculate each child’s kindness score as the difference between their good deeds and bad deeds (goodDeeds - badDeeds).",
    "Decide whether the child belongs to the Nice List if their kindness score is greater than or equal to the threshold.",
    "Return an object with two alphabetically sorted arrays: niceList: Names of children who made it onto the Nice List and naughtyList: Names of children who are on the Naughty List.",
    "If a child has the same number of good deeds and bad deeds, they are automatically placed on the Naughty List.",
    "If the children array is empty, return message: 'Santa has no children to check!'",
  ];

  const title = "Nice or Naughty list";

  return (
    <>
      <Title>{title}</Title>
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

          <Text>{functionTitle}</Text>

          <List>
            {functionList.map((text, index) => (
              <li key={index}>{text}</li>
            ))}
          </List>

          {/* {!!userData && <UserDataBlock {...userData} />} */}
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
  color: #454f47;
  display: flex;
  flex-direction: column;
  font-size: 1vw;
  gap: 10px;
  padding-left: 30px;
`;
// function categorizeChildren(threshold, children) {
//   if (!children || children.length === 0) {
//     return "Santa has no children to check!";
//   }

//   const niceList = [];
//   const naughtyList = [];

//   children.forEach((child) => {
//     const { name, goodDeeds, badDeeds } = child;
//     const kindnessScore = goodDeeds - badDeeds;

//     if (kindnessScore >= threshold) {
//       niceList.push(name);
//     } else {
//       naughtyList.push(name);
//     }
//   });

//   niceList.sort((a, b) => a.localeCompare(b));
//   naughtyList.sort((a, b) => a.localeCompare(b));

//   return { niceList, naughtyList };
// }
