import styled from "styled-components";

import { Link, useSearchParams } from "react-router-dom";
import { images } from "../../assets";
import { SnowGenerator, TaskTemplate } from "../../components";
import { VariantType } from "../../components/types";

export const Task = () => {
  const [searchParams] = useSearchParams();

  const date = searchParams.get("date");
  return (
    <Wrapper>
      <Main>
        <BackButton to={"/"}>
          <Icon src={images.arrow} />
        </BackButton>
        <TaskTemplate variant={date as VariantType} />
        <SnowGenerator />
      </Main>
    </Wrapper>
  );
};

const Main = styled.div`
  max-width: 89vw;
  width: 90%;
  position: absolute;
`;

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 100vh;
  overflow-y: hidden;
  width: 99vw;
`;
const BackButton = styled(Link)`
  color: #000;
  position: relative;
  left: 100px;
  top: 90px;
`;
const Icon = styled.img`
  transform: rotate(180deg);
  width: 100px;
`;
