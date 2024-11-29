import { FC, useEffect, useState } from "react";
import styled from "styled-components";

import CodeEditor from "../CodeEditor";

import { TaskTemplatePropsType } from "./types";
export const Task3: FC<TaskTemplatePropsType> = ({}) => {
  const variant = "3";
  const initialUserCode = localStorage.getItem(variant);

  const [userCode, setUserCode] = useState(
    initialUserCode
      ? initialUserCode
      : `function countdownToNewYear() {
  
}`
  );

  type ResultType = {
    total: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };

  const [time, setTime] = useState<ResultType>({
    total: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [userFunction, setUserFunction] = useState<Function | null>(null);
  const [error, setError] = useState("");
  const [showTimer, setShowTimer] = useState(!!userFunction);

  const handleRunCode = () => {
    setShowTimer(false);
    setError("");
    try {
      const userFunction = new Function(`
        ${userCode};
        return timer;
      `)();
      if (typeof userFunction !== "function") {
        throw new Error("Your code must define a 'timer' function.");
      }
      setUserFunction(() => userFunction);
    } catch (err: any) {
      setError(`Execution Error: ${err.message}`);
    }
  };

  useEffect(() => {
    if (!userFunction) return;

    const interval = setInterval(() => {
      try {
        const timerResult = userFunction();
        if (
          typeof timerResult !== "object" ||
          !(
            "days" in timerResult &&
            "hours" in timerResult &&
            "minutes" in timerResult &&
            "seconds" in timerResult &&
            "total" in timerResult
          )
        ) {
          throw new Error(
            "Your function must return an object with 'days', 'hours', 'minutes', and 'seconds'."
          );
        }
        setTime(timerResult);
        setShowTimer(true);
      } catch (err: any) {
        setError(`Execution Error: ${err.message}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [userFunction]);

  useEffect(() => {
    if (!!initialUserCode) {
      handleRunCode();
    }
  }, []);
  const buttonTitle = "Run timer";

  const { days, hours, minutes, seconds } = time;

  const timerDays = days
    ? days > 1
      ? `${days} days and`
      : `${days} day and`
    : "";
  const timerHours = hours ? (hours < 10 ? `0${hours}` : `${hours}`) : "00";

  const timerMinutes = minutes
    ? minutes < 10
      ? `0${minutes}`
      : `${minutes}`
    : "00";

  const timerSeconds = seconds
    ? seconds < 10
      ? `0${seconds}`
      : `${seconds}`
    : "00";

  const timerText = time.total
    ? `${timerDays} ${timerHours}:${timerMinutes}:${timerSeconds} until New Year 🎉`
    : "Happy New Year! 🎇";

  const description = [
    "The New Year is coming, and it’s time to count down to the big moment!",
    " Your task is to create a function that calculates the remaining time until New Year’s Day.",
    "Write a function named countdownToNewYear (or choose another descriptive name) that performs the following:",
  ];
  const coments = [
    "Once you write the function, the system will handle updating the countdown every second on your behalf.",
    "If your function is written correctly, you’ll see a little bit of magic happen! ✨",
    "Good luck, and may your countdown be flawless!",
  ];
  const list = [
    "Calculates the time remaining until the next New Year’s Day (January 1st at midnight).",
    "Returns an object containing: {total (number): total time remaining in milliseconds, days (number): number of full days remaining, hours (number): remaining hours after subtracting full days, minutes (number): remaining minutes after subtracting full hours, seconds (number): remaining seconds after subtracting full minutes}",
  ];

  const title = "New year countdown";

  return (
    <>
      <Title>{showTimer ? timerText : title}</Title>
      <Container>
        <Description>
          {description.map((text) => (
            <Text>{text}</Text>
          ))}
          <List>
            {list.map((text, index) => (
              <li key={index}>{text}</li>
            ))}
          </List>
          {coments.map((text, index) => (
            <Text key={index}>{text}</Text>
          ))}
        </Description>
        <CodeEditor
          buttonTitle={buttonTitle}
          error={error}
          handleRunCode={handleRunCode}
          result={[]}
          setUserCode={setUserCode}
          userCode={userCode}
          variant={variant}
        />
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
