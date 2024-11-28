import { FC } from "react";
import styled, { keyframes } from "styled-components";

export const SnowGenerator: FC = () => {
  const arr = Array(100).fill(0);

  const snows = arr.map(() => ({
    $randomStart: Math.random() * 100,
    $randomSize: Math.random() * 10 + 5,
    $randomDuration: Math.random() * 5 + 5,
    $randomDelay: Math.random() * 5,
  }));
  return (
    <SnowContainer>
      {snows.map(
        (
          { $randomDelay, $randomDuration, $randomSize, $randomStart },
          index
        ) => (
          <Snow
            key={index}
            $randomDelay={$randomDelay}
            $randomDuration={$randomDuration}
            $randomSize={$randomSize}
            $randomStart={$randomStart}
          />
        )
      )}
    </SnowContainer>
  );
};

const fall = keyframes` 
  to  {
    transform: translateY(110vh) rotate(360deg);
  }
`;

const SnowContainer = styled.div`
  height: 100%;
  left: 0;
  overflow: hidden;
  pointer-events: none;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
`;

const Snow = styled.div.attrs<{
  $randomDelay: number;
  $randomDuration: number;
  $randomSize: number;
  $randomStart: number;
}>(({ $randomStart, $randomSize, $randomDuration, $randomDelay }) => ({
  style: {
    animationDelay: `${$randomDelay}s`,
    animationDuration: `${$randomDuration}s`,
    height: `${$randomSize}px`,
    left: `${$randomStart}%`,
    width: `${$randomSize}px`,
  },
}))`
  animation-timing-function: linear, ease-in-out;
  animation: ${fall} linear infinite;
  background-color: #91e9f0;
  border-radius: 50%;
  opacity: 0.5;
  position: absolute;
  top: -10%;
`;
