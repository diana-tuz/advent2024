import { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { images } from "../../assets";
import { TaskTitlePropsType } from "./types";

export const TaskTitle: FC<TaskTitlePropsType> = ({
  title,
  onSave,
  snowButton: { isON, onClick } = {},
}) => (
  <TitleContainer>
    <BackButton to={"/"} onClick={onSave}>
      <Icon src={images.arrow} />
    </BackButton>
    <Title>{title}</Title>
    <ButtonsContainer>
      <SnowButtonContainer>
        <SnowTitle>{isON ? "Snow off" : "Let it snow"}</SnowTitle>
        <SnowButton onClick={onClick} $isON={isON}>
          <Item $isON={isON} />
        </SnowButton>
      </SnowButtonContainer>
      {onSave && (
        <Container>
          <Button onClick={onSave}>Save</Button>
        </Container>
      )}
    </ButtonsContainer>
  </TitleContainer>
);

const Title = styled.h1`
  text-shadow: 0 0 10px #4f775d;
  color: #454f47;
  font-size: 70px;
  text-decoration: underline dotted;
  margin-bottom: 20px;
  margin-left: 30px;
  text-align: center;
  @media screen and (max-width: 768px) {
    font-size: 35px;
    width: 100%;
  }
`;
const SnowTitle = styled.p``;

const BackButton = styled(Link)``;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: baseline;
  align-content: end;
  gap: 25px;
  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 10px 0;
  }
`;

const SnowButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  width: 200px;
`;

const SnowButton = styled.button<{ $isON?: boolean }>`
  display: flex;
  width: 60px;
  height: 25px;
  align-items: center;
  background-color: #4f775d;
  border-radius: 50px;
  font-style: 10px;
  justify-content: space-between;
`;

const Item = styled.div<{ $isON?: boolean }>`
  width: 15px;
  height: 15px;
  background: snow;
  display: block;
  border-radius: 50%;
  transform: translateX(${({ $isON }) => ($isON ? "-100%" : "100%")});
  transition: all 0.5s ease-in-out;
`;

const Icon = styled.img`
  transform: rotate(180deg);
  width: 100px;
  @media screen and (max-width: 768px) {
    width: 50px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: start;
  }
`;

const Container = styled.div`
  display: flex;
`;

const Button = styled.button``;
