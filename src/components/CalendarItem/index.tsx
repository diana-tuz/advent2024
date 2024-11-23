import { FC } from "react";

import styled from "styled-components";

import { CalendarItemPropsType } from "./types";

export const CalendarItem: FC<CalendarItemPropsType> = ({ day }) => {
  const today = new Date().toLocaleDateString();
  const todayDate = today.split("/")[1];
  const currentDate = day.split("/")[1];
  const isSelectedDay = todayDate === currentDate;
  const isDisabled = +currentDate > +todayDate;
  return (
    <Container $isSelectedDay={isSelectedDay} disabled={isDisabled}>
      <Datew>{currentDate}</Datew>
      {/* <p>{today}</p> */}
    </Container>
  );
};

const Container = styled.button<{ $isSelectedDay: boolean }>`
  align-items: center;
  border: ${({ $isSelectedDay }) => ($isSelectedDay ? "2px solid red" : "")};
  display: flex;
  height: 200px;
  justify-content: center;
  width: 180px;
`;
const Datew = styled.p`
  font-size: 15px;
`;
