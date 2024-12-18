import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { HeroPropsType } from "./types";

export const Hero: FC<HeroPropsType> = () => {
  const newYear = new Date("1/1/2025");

  const [day, setDay] = useState(0);
  const [total, setTotal] = useState(0);
  const [hour, setHour] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  function timeLeft() {
    const total =
      Date.parse("1/1/2025 00:00:00:00") - Date.parse(new Date().toString());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    setDay(days);
    setHour(hours);
    setMinutes(minutes);
    setSeconds(seconds);
    setTotal(total);
    return {
      total,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      timeLeft();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timerDays = day ? (day > 1 ? `${day} days and` : `${day} day and`) : "";
  const timerHours = hour ? (hour < 10 ? `0${hour}` : `${hour}`) : "00";
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

  const timerText = total
    ? newYear
      ? `${timerDays} ${timerHours}:${timerMinutes}:${timerSeconds} until New Year 🎉`
      : "Happy New Year! 🎇"
    : "";

  return (
    <Container>
      {<Text>{timerText}</Text>}
      <Title>Let's make your December unbelievable!</Title>
    </Container>
  );
};

const Container = styled.div``;

const Text = styled.p`
  font-size: 3.472vw;
  color: #6e452d;
  font-weight: 700;
  text-transform: uppercase;
  @media screen and (max-width: 768px) {
    font-size: 7vw;
  }
`;

const Title = styled.h2`
  font-size: 1.736vw;
  color: #6e452d;
  margin-bottom: 0.694vw;

  @media screen and (max-width: 768px) {
    font-size: 4vw;
  }
`;
