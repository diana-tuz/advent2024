import { FC } from "react";

import { styled } from "styled-components";

import { CalendarItem } from "../CalendarItem";
import { CalendarPropsType } from "./types";

export const Calendar: FC<CalendarPropsType> = () => {
  function generateArray(limit: number) {
    return [...Array(limit)].map((_, i) => `12/${i + 1}/2024`);
  }

  const november = generateArray(24);

  return (
    <Container>
      {november.map((day) => (
        <CalendarItem day={day} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80vw;
  justify-content: start;
  align-items: center;
  gap: 15px;
`;
