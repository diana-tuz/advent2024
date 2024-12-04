import { FC, useState } from "react";
import styled from "styled-components";

import CodeEditor from "../CodeEditor";

import { TaskTitle } from "../TaskTitle";
import { TaskTemplatePropsType } from "./types";

export const DuplicateDecorations: FC<TaskTemplatePropsType> = ({
  variant = "1",
  snowButton,
}) => {
  const initialUserCode = localStorage.getItem(variant);
  const [userCode, setUserCode] = useState(
    initialUserCode
      ? initialUserCode
      : `/*
    duplicates in one line, return: "Oops, we have a duplicate at line: <numberLine>",
    duplicates in multiple lines, return: "We have a huge problem! Duplicates at lines: <numberLine>, <numberLine>",
    duplicates in all lines, return: "We need to decorate again! Duplicates on every line!",
    no duplicates anywhere, return: "Mission complete!"
    */
    
    function  detectDecorationDuplicates (treeLines) {
  /* Add your solution here */
}`
  );
  const [result, setResult] = useState<any[]>([""]);
  const [error, setError] = useState("");

  const testData = [
    {
      1: ["star", "ball", "ball"],
      2: ["snowflake", "star", "snowflake"],
      3: ["candy", "gift", "star"],
      4: ["bell", "star", "snowflake"],
    },
    {
      1: ["snowflake", "star", "star", "ball"],
      2: ["ball", "star", "ball", "snowflake"],
      3: ["snowflake", "bell", "bell", "star"],
      4: ["bell", "snowflake", "snowflake", "ball"],
    },
    {
      1: ["ball", "snowflake", "bell"],
      2: ["snowflake", "bell", "star"],
      3: ["star", "ball", "snowflake"],
      4: ["star", "snowflake", "bell"],
    },
    {
      1: ["ball", "star", "star"],
      2: ["snowflake", "candy", "bell"],
      3: ["angel", "star", "snowflake"],
      4: ["bell", "snowflake", "ball"],
    },
  ];

  const expectedResults = [
    "We have a huge problem! Duplicates at lines: 1, 2",
    "We need to decorate again! Duplicates on every line!",
    "Mission complete!",
    "Oops, we have a duplicate at line: 1",
  ];

  const handleRunCode = () => {
    setError("");
    try {
      const preparedUserFunction = userCode.split(
        "detectDecorationDuplicates(treeLines)"
      )[1];

      console.log("preparedUserFunction", preparedUserFunction);
      const userFunction = new Function("treeLines", preparedUserFunction);
      const testResults = testData.map((data, index) => {
        const output = userFunction(data);
        const isPassed = expectedResults[index] === output;
        return {
          input: `treeLines: ${JSON.stringify(data)}`,
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
    "Each year, the family decorates the Christmas tree with colorful baubles, stars, snowflakes, ribbons, and much more. Perfectionists are distressed when two identical ornaments hang on the same line of the tree.",
    `Let's write a function that takes an object where the keys are line numbers and the values are arrays of decorations for each line`,
    "The function should check if there are any lines with duplicate decorations.",
  ];

  const list = [
    'If duplicates are found in one line, the function should return: "Oops, we have a duplicate at line: <numberLine>"',
    'If duplicates are found in multiple lines, the function should return: "We have a huge problem! Duplicates at lines: <numberLine>, <numberLine>"',
    'If duplicates are found in all lines, return: "We need to decorate again! Duplicates on every line!"',
    'If there are no duplicates anywhere, return: "Mission complete!"',
  ];

  const comment = "Let's decorate! 🎄";

  const title = "Duplicate decorations";

  const onSave = () => localStorage.setItem(variant, userCode);

  // function detectDecorationDuplicates(treeLines) {
  //   let count = 0;
  //   let linesWithDublicate = "";
  //   const lines = Object.keys(treeLines);

  //   for (let name of lines) {
  //     const sortedLine = treeLines[name].sort();
  //     const isDuplicate = sortedLine.find(
  //       (item, index) => item === sortedLine[index + 1]
  //     );
  //     if (isDuplicate) {
  //       count++;
  //       if (count > 1 && count < lines.length) {
  //         linesWithDublicate += `, ${name}`;
  //       } else {
  //         linesWithDublicate += name;
  //       }
  //     }
  //   }
  //   if (count === 0) {
  //     return "Mission complete!";
  //   } else if (count === 1) {
  //     return `Oops, we have a duplicate at line: ${linesWithDublicate}`;
  //   } else if (count > 1 && count < lines.length) {
  //     return `We have a huge problem! Duplicates at lines: ${linesWithDublicate}`;
  //   } else {
  //     return "We need to decorate again! Duplicates on every line!";
  //   }
  // }
  // const res = detectDecorationDuplicates(testData[3]);
  // console.log({ res });

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
