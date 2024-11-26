import { FC, useState } from "react";

import styled, { keyframes } from "styled-components";

import { images } from "../../assets";
import { CalendarItemPropsType } from "./types";

export const CalendarItem: FC<CalendarItemPropsType> = ({ day }) => {
  // const isWinter = new Date().getMonth().toString() === "1";
  const todayDate = new Date().getDate().toString();
  // const todayDate = "6";
  const currentDate = day.split("/")[1];
  const isDisabled = +currentDate > +todayDate;
  const lightsArray = Array(10).fill(0);
  const colors = [
    "#ec4141",
    "#00ff00",
    "#00f",
    "#e1f00f",
    "#f557f5",
    "#ec4141",
    "#00ff00",
    "#00f",
    "#e1f00f",
    "#f557f5",
  ];
  const isStClaus = "6" === currentDate;
  const isCristmasEve = "24" === currentDate;
  const isCristmas = "25" === currentDate;
  const isNewYear = "31" === currentDate;
  const isSelectedDay = todayDate === currentDate;

  const [isDisplayed, setIsDisplayed] = useState(false);
  const onClick = () => {
    setIsDisplayed(true);
    setTimeout(() => setIsDisplayed(false), 6000);
  };
  return (
    <Container
      onClick={onClick}
      $isSelectedDay={isSelectedDay}
      $isHoliday={isStClaus || isNewYear || isCristmas || isCristmasEve}
      disabled={isDisabled}
    >
      <Message $isDisplayed={isDisplayed}>
        <p>It's not winter yet! Please, wait a little bit!</p>
      </Message>

      <Datew
        $isSelectedDay={isSelectedDay}
        $isHoliday={isStClaus || isNewYear || isCristmas || isCristmasEve}
      >
        {currentDate}
      </Datew>
      {isSelectedDay && (
        <Lights>
          {lightsArray.map((_, index) => (
            <Light key={index}>
              <Item $delay={index * 0.2} $color={colors[index]} />
            </Light>
          ))}
        </Lights>
      )}
      {isStClaus && <Image src={images.stm} alt="santaClaus" />}
      {(isCristmasEve || isCristmas) && (
        <Image src={isCristmasEve ? images.tree : images.candle} />
      )}
      {isNewYear && <Text>Happy New Year!</Text>}
    </Container>
  );
};
const Message = styled.div<{ $isDisplayed: boolean }>`
  position: absolute;
  background-color: snow;
  padding: 0.694vw;
  right: 0;
  width: 9.806vw;
  border-radius: 0 28px 28px 28px;
  z-index: 12;
  color: #3b503d;
  opacity: ${({ $isDisplayed }) => ($isDisplayed ? 1 : 0)};
  transition: opacity ease-in 1s;

  @media screen and (max-width: 768px) {
    width: 22vw;
    padding: 1vw;
  }
`;
const Container = styled.button<{
  $isSelectedDay: boolean;
  $isHoliday: boolean;
}>`
  align-items: center;
  background: #3b503d;
  border: ${({ $isHoliday }) => $isHoliday && "5px dashed snow"};
  border: ${({ $isSelectedDay }) => ($isSelectedDay ? "5px dotted red" : "")};
  display: flex;
  flex-direction: column;
  height: 8.417vw;
  justify-content: center;
  overflow: hidden;
  position: relative;
  width: 9.806vw;
  @media screen and (max-width: 768px) {
    width: 25vw;
    height: 15vh;
  }
`;
const Datew = styled.p<{
  $isSelectedDay: boolean;
  $isHoliday: boolean;
}>`
  font-size: 3.819vw;
  color: ${({ $isSelectedDay }) => ($isSelectedDay ? "snow" : "#b62022")};
  z-index: 2;
  text-shadow: ${({ $isHoliday }) => $isHoliday && "0 0 6px snow"};
  @media screen and (max-width: 768px) {
    font-size: 9vw;
  }
`;

const Lights = styled.div`
  position: absolute;
  top: 0.694vw;
  left: 0;
  display: flex;
  gap: 25px;
  padding: 0 0.694vw;
  flex-wrap: nowrap;
`;
const Light = styled.div`
  border-radius: 3px;
  display: block;
  content: "";
  width: 10px;
  height: 10px;
  background-color: #31302e;
  position: relative;

  &:after {
    position: absolute;
    right: -27px;
    top: 0;
    border-bottom: 1px solid #31302e;
    border-radius: 50%;
    content: "";
    width: 30px;
    height: 5px;
    z-index: 0;
  }
  &:first-child {
    &:before {
      position: absolute;
      left: -27px;
      top: 0;
      border-bottom: 1px solid #31302e;
      border-radius: 50%;
      content: "";
      width: 30px;
      height: 5px;
      z-index: 0;
    }
  }
`;

const cristmasLights = keyframes`
0% {
  opacity:0.5;
}

50% {
  opacity:1;
}

100% {
  opacity:0.5;
}  
`;

const Item = styled.div<{ $delay: number; $color: string }>`
  width: 12px;
  height: 20px;
  border-radius: 40%;
  position: absolute;
  bottom: -18px;
  left: -1px;
  opacity: 0.5;
  animation: ${cristmasLights} ease-in infinite;
  animation-duration: 2s;
  animation-delay: ${({ $delay }) => `${$delay}s`};
  background-color: ${({ $color }) => $color};
  border-radius: 50%;
  box-shadow: 0 0 0.694vw ${({ $color }) => $color};
`;

const Image = styled.img`
  width: 3.5vw;
  z-index: 0;
  position: absolute;
  bottom: 3px;
  right: 0;
  @media screen and (max-width: 768px) {
    width: 8vw;
  }
`;

const Text = styled.p`
  font-size: 1.389vw;
  color: snow;
`;
