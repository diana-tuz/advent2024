import { FC, useState } from "react";
import styled from "styled-components";

import { christmasMovies } from "../../constants";

import CodeEditor from "../CodeEditor";
import { TaskTitle } from "../TaskTitle";
import { UserDataBlock } from "../UserDataBlock";

import { UserDataVariantType } from "../types";
import { TaskTemplatePropsType } from "./types";
interface MovieType {
  name: string;
  genre: string;
  country: string;
  year: number;
}

interface CriteriaType {
  genre?: string;
  year?: number;
}

export const MovieSuggestion: FC<TaskTemplatePropsType> = ({
  variant = "1",
  snowButton,
}) => {
  const initialUserCode = localStorage.getItem(variant);
  const [userCode, setUserCode] = useState(
    initialUserCode
      ? initialUserCode
      : `function  getMovieSuggestion (movies, criteria) {
  /* Add your solution here */
}`
  );

  const [result, setResult] = useState<any[]>([""]);
  const [error, setError] = useState("");

  const [isUserData, setIsUserData] = useState(false);
  const [presentCount, setPresentCount] = useState(2);

  const testData: [MovieType[], CriteriaType?][] = [
    [christmasMovies],
    [christmasMovies, { genre: "Romantic Comedy" }],
    [christmasMovies, { year: 2025 }],
    [christmasMovies, { genre: "Comedy", year: 1980 }],
    [christmasMovies, { genre: "Comedy Horror" }],
  ];

  const presentsArr = Array(presentCount).fill(0);

  const addPresent = () => setPresentCount(presentCount + 1);

  const toggleIsUserData = () => {
    setIsUserData(!isUserData);
    setResult([]);
  };
  const isGenre = (userGenre: string) => {
    return christmasMovies.some(({ genre }) => genre === userGenre);
  };
  const isYear = (userYear: number) => {
    return christmasMovies.some(({ year }) => year === userYear);
  };
  const keyPhrases = [
    "Your movie for tonight is",
    "a fantastic",
    "released in",
    ". Enjoy!",
  ];

  const errorMessage = "No movie matches your criteria!";

  const handleRunCode = () => {
    setError("");
    try {
      const preparedUserFunction = userCode.split("(movies, criteria)")[1];

      const userFunction = new Function(
        "movies",
        "criteria",
        preparedUserFunction
      );

      const preparedTestData: [MovieType[], CriteriaType?][] = testData;

      const testResults = preparedTestData.map((data) => {
        const [movies, criteria = {}] = data;
        const output = userFunction(movies, criteria);

        let isPassed = false;
        if (!!Object.keys(criteria)) {
          isPassed = keyPhrases.every((phrase) => output.includes(phrase));
        }
        const isValidGenre = isGenre(criteria.genre as string);
        const isValidYear = isYear(criteria.year as number);

        const userOutput = output as string;

        const genreMatch =
          criteria.genre && userOutput.includes(criteria.genre);

        const yearMatch = criteria.year ? userOutput.split(" in ")[1] : 0;

        if (criteria.genre && criteria.year) {
          isPassed = !!genreMatch && !!(+yearMatch >= criteria.year);
        } else if (criteria.genre) {
          if (isValidGenre) {
            isPassed = !!genreMatch;
          } else {
            isPassed = userOutput === errorMessage;
          }
        } else if (criteria.year) {
          if (isValidYear) {
            isPassed = !!(+yearMatch >= criteria.year);
          } else {
            isPassed = userOutput === errorMessage;
          }
        }

        return {
          input: criteria
            ? `movies, criteria: ${JSON.stringify(criteria)}`
            : "moviesList",
          output,
          pass: isPassed,
        };
      });

      setResult(testResults);
    } catch (err: any) {
      setError(`Execution Error: ${err.message}`);
    }
  };

  const buttonTitle = "Let's calculate";

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
    "To create the perfect holiday vibe, there’s nothing like a great Christmas movie! Our cinema has a fantastic selection, but how do you pick the one? Let’s build a movie generator to help us choose the perfect film for the evening!",
    "Create a function called getMovieSuggestion that takes two arguments:",
  ];
  const commentTitle = "Function Logic:";
  const comment = "Now it’s time to build your magical movie generator! 🎥✨";
  const comments = [
    'The function must return a string: "Your movie for tonight is <name>, a fantastic <genre>, released in <year> in <country>. Enjoy!"',
    "If no criteria is passed, the function should pick a random movie from the array",
    "If criteria is provided, the function should pick a random movie based on the given properties (genre and/or year). If genre is provided, the movie must match this genre. If year is provided, the movie’s year must be greater than or equal to the provided year.",
    'If no movies match the provided criteria, return: "Sorry, we couldn’t find any movies that match your preferences. Try adjusting the filters!"',
  ];
  const list = [
    "movies — an array of objects where each object represents a movie with the following properties: {name: string, genre: string, country: string, year:number}",
    "criteria (optional) — an object with the following properties (which can be one or both): genre, and a minimum year of production (e.g., if year = 2020, the film must be from after 2020). Examle:{genre:'Comedy, year: 2020} or {year:1997} etc.",
  ];

  const title = "Magical movie generator";

  const userData = {
    addPresent,
    isUserData,
    presentsArr,
    toggleIsUserData,
    variant: variant as UserDataVariantType,
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

          <List>
            {list.map((text, index) => (
              <li key={index}>{text}</li>
            ))}
          </List>
          <Text>{commentTitle}</Text>
          <List>
            {comments.map((text, index) => (
              <li key={index}>{text}</li>
            ))}
          </List>
          <Text>{comment}</Text>

          {!!userData && <UserDataBlock {...userData} />}
        </Description>
        <CodeEditor {...codeEditor} />
      </Container>
    </>
  );
};

////////////////////

////////////////////
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
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
