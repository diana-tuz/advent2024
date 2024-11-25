import styled, { keyframes } from "styled-components";
import "./App.css";
import { Calendar } from "./components/Calendar";
import { Hero } from "./components/Hero";

function App() {
  const arr = Array(100).fill(0);

  const snows = arr.map(() => ({
    $randomStart: Math.random() * 100,
    $randomSize: Math.random() * 10 + 5,
    $randomDuration: Math.random() * 5 + 5,
    $randomDelay: Math.random() * 5,
  }));

  return (
    <Wrapper>
      <Main>
        <Hero />
        <Calendar />
        <SnowContainer>
          {snows.map(
            (
              { $randomStart, $randomSize, $randomDuration, $randomDelay },
              index
            ) => (
              <Snow
                key={index}
                $randomStart={$randomStart}
                $randomSize={$randomSize}
                $randomDuration={$randomDuration}
                $randomDelay={$randomDelay}
              />
            )
          )}
        </SnowContainer>
      </Main>
    </Wrapper>
  );
}

export default App;

const fall = keyframes` 
  to  {
    transform: translateY(110vh) rotate(360deg);
  }
`;

const SnowContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 999;
`;

const Snow = styled.div.attrs<{
  $randomStart: number;
  $randomSize: number;
  $randomDuration: number;
  $randomDelay: number;
}>(({ $randomStart, $randomSize, $randomDuration, $randomDelay }) => ({
  style: {
    left: `${$randomStart}%`,
    width: `${$randomSize}px`,
    height: `${$randomSize}px`,
    animationDuration: `${$randomDuration}s`,
    animationDelay: `${$randomDelay}s`,
  },
}))`
  position: absolute;
  top: -10%;
  background-color: #91e9f0;
  border-radius: 50%;
  opacity: 0.5;
  animation: ${fall} linear infinite;
  animation-timing-function: linear, ease-in-out;
`;

const Main = styled.div`
  max-width: 89vw;
  width: 90%;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 99vw;
  overflow-x: hidden;
`;
