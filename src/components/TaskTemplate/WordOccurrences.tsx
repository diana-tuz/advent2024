import { FC, useState } from "react";
import styled from "styled-components";

import CodeEditor from "../CodeEditor";

import { TaskTitle } from "../TaskTitle";
import { TaskTemplatePropsType } from "./types";

export const WordOccurrences: FC<TaskTemplatePropsType> = ({
  variant = "1",
  snowButton,
}) => {
  const initialUserCode = localStorage.getItem(variant);
  const [userCode, setUserCode] = useState(
    initialUserCode
      ? initialUserCode
      : `function  countWordOccurrences(story, word) {
  /* Add your solution here */
}`
  );
  const [result, setResult] = useState<any[]>([""]);
  const [error, setError] = useState("");

  const expectedResults = [
    3,
    5,
    "Oops, the story doesn't have any occurrences of this word",
    3,
  ];

  const testData = [
    [
      "One cold winter morning, the elves at the North Pole decided to have the biggest snowball fight ever! They built massive forts made of snow and took turns launching snowballs at each other. However, they soon realized they had a problem: the snowballs kept melting before they could throw them! So, the elves got creative and began using snowflakes, carefully collecting them and packing them into perfect snowballs. The fight raged for hours, with laughter echoing across the snowy landscape. By the end of the day, everyone was covered in snow, but the elves agreed it was the best snowball fight ever!",
      "snowballs",
    ],
    [
      "One snowy evening, as Santa prepared for his big journey, one of the elves, Elfin, accidentally dropped his map. When he went to find it, he stumbled upon a mysterious, hidden sleigh deep in the forest. The sleigh was made of glittering ice and sparkled in the moonlight, but it wasn’t like any sleigh he had ever seen before. As Elfin climbed aboard, the sleigh magically lifted into the air and flew him high above the North Pole. The ride was thrilling, and when he returned, he told everyone about his secret adventure. No one knew where the sleigh came from, but it was said to be a gift from the Northern Lights themselves!",
      "sleigh",
    ],
    [
      "It was the day before Christmas Eve, and Santa was getting ready to deliver gifts. But something was wrong—one of the reindeer was missing! The elves quickly set off on a quest to find it. They searched high and low, in the snowy forests and icy caves. After hours of searching, they finally found the reindeer, which had wandered off to play with the magical snow animals. The reindeer had made a new friend, a fluffy white snow fox, and didn’t want to leave. After a lot of convincing (and a few carrot snacks), the elves managed to return the reindeer just in time for Santa’s big night!",
      "satan",
    ],
    [
      "Every year, the elves at the North Pole secretly throw a grand party to celebrate the end of a busy year. This year, however, one curious elf named Spark decided to find out what all the excitement was about. Spark sneaked away from his work to follow the other elves. After a long walk through the snow-covered woods, he found a hidden cave filled with twinkling lights, music, and lots of treats. Elves were singing, dancing, and enjoying the snow. Spark joined the fun, and it turned out to be the best party he had ever been to. The elves told him that this was a tradition, and every elf at the North Pole deserved to have a little celebration.",
      "year",
    ],
  ];
  const handleRunCode = () => {
    setError("");
    try {
      const preparedUserFunction = userCode.split("(story, word)")[1];

      const userFunction = new Function("story", "word", preparedUserFunction);
      const testResults = testData.map((data, index) => {
        const [story, word] = data;
        const output = userFunction(story, word);
        const isPassed = expectedResults[index] === output;
        return {
          input: `story: ${story}, word: ${word} `,
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
    "Elves, to entertain themselves, keep track of how many times a specific word is used in a New Year's story. Let's help them by writing a function that takes in a sentence and a word, and counts how many times that word appears in the sentence.",
    `The function should return the number of occurrences. If the word doesn't appear, return the string: 'Oops, the story doesn't have any occurrences of this word.'`,
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
          ))}
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
  /* gap: 20px; */
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
