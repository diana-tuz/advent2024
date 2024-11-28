import styled from "styled-components";

import { Calendar, Hero, SnowGenerator } from "../../components";

export const Home = () => {
  return (
    <Wrapper>
      <Main>
        <Hero />
        <Calendar />
        <SnowGenerator />
      </Main>
    </Wrapper>
  );
};

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
