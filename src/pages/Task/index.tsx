import styled from "styled-components";

import { useSearchParams } from "react-router-dom";
import { images } from "../../assets";
import { SnowGenerator, TaskTemplate } from "../../components";
import { VariantType } from "../../components/types";

export const Task = () => {
  const [searchParams] = useSearchParams();

  const date = searchParams.get("date");
  return (
    <Wrapper>
      <Main>
        <TaskTemplate variant={date as VariantType} />
        <SnowGenerator />
      </Main>
    </Wrapper>
  );
};

const Main = styled.div`
  max-width: 85vw;
  width: 90%;
  padding: 50px 0;
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
