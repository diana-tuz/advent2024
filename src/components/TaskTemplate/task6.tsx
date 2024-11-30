import { FC, useState } from "react";
import styled from "styled-components";

import CodeEditor from "../CodeEditor";
import { UserDataBlock } from "../UserDataBlock";

import { christmasMovies } from "../../constants";
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

export const Task6: FC<TaskTemplatePropsType> = ({}) => {
  const variant = "6";
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

  const [userBudget, setUserBudget] = useState(0);
  const [userPresents, setUserPresents] = useState<number[]>([0]);
  const userTestData = [[userBudget, userPresents]];

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
    setUserBudget(0);
    setUserPresents([]);
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
    "If no criteria is passed, the function should choose a random movie from the array",
    "If criteria is passed, the function should filter the movies based on the given properties (genre and/or country). The genre can be a single value or an array of genres. The movie should match at least one genre from the list. The country should match the movie's country property exactly.",
    'If no movies match the provided criteria, return: "Sorry, we couldn’t find any movies that match your preferences. Try adjusting the filters!"',
  ];
  const list = [
    "movies — an array of objects where each object represents a movie with the following properties: {name: string,genre: string, country: string, year:number}",
    "criteria (optional) — an object with the following properties (which can be one or both): genre, and a minimum year of production (e.g., if year = 2020, the film must be from after 2020). Examle:{genre:'Comedy, year: 2020} or {year:1997} etc.",
  ];

  const title = "Santa’s budget assistant";

  const userData = {
    addPresent,
    isUserData,
    presentsArr,
    setUserBudget,
    setUserPresents,
    userBudget,
    toggleIsUserData,
    variant: variant as UserDataVariantType,
  };

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
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
