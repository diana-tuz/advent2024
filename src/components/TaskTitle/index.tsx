import { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { images } from "../../assets";
import { TaskTitlePropsType } from "./types";

export const TaskTitle: FC<TaskTitlePropsType> = ({ title, onSave }) => (
  <TitleContainer>
    <BackButton to={"/"} onClick={onSave}>
      <Icon src={images.arrow} />
    </BackButton>
    <Title>{title}</Title>
    {onSave && (
      <Container>
        <Button onClick={onSave}>Save</Button>
      </Container>
    )}
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
  }
`;

const BackButton = styled(Link)``;
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
`;

const Container = styled.div`
  display: flex;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Button = styled.button``;
