import { FC } from "react";

import { styled } from "styled-components";

import { Link, useSearchParams } from "react-router-dom";
import { CalendarItem } from "../CalendarItem";
import { CalendarPropsType } from "./types";

export const Calendar: FC<CalendarPropsType> = () => {
  function generateArray(limit: number) {
    return [...Array(limit)].map((_, i) => `${i + 1}`);
  }
  const november = generateArray(31);

  const [_, setSearchParams] = useSearchParams();

  return (
    <Container>
      {november.map((day) => {
        const onClick = () => setSearchParams({ date: String(day) });
        return (
          <Link to={`tasks?date=${day}`} key={day}>
            <CalendarItem day={day} onClick={onClick} />
          </Link>
        );
      })}
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
