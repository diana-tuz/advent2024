import { FC } from "react";

import { styled } from "styled-components";

import { CalendarItem } from "../CalendarItem";
import { CalendarPropsType } from "./types";

export const Calendar: FC<CalendarPropsType> = () => {
  function generateArray(limit: number) {
    return [...Array(limit)].map((_, i) => `12/${i + 1}/2024`);
  }

  const november = generateArray(31);

  return (
    <Container>
      {november.map((day) => (
        <CalendarItem day={day} key={day} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 1.042vw;
  justify-content: start;
  margin: 0 auto;
  width: 90%;
  @media screen and (max-width: 768px) {
    gap: 2vw;
  }
`;
