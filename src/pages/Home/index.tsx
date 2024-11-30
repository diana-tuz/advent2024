import styled from "styled-components";

import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { images } from "../../assets";
import { Calendar, Hero, SnowGenerator } from "../../components";

export const Home = () => {
  const [_, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams("");
  }, []);

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
  max-width: 85vw;
  width: 90%;
  padding: 120px 0;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 99vw;
  margin: 0 auto;
  overflow-x: hidden;
  background: url(${images.winter});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;
