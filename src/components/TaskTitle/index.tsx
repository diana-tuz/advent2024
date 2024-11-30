import { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { images } from "../../assets";
import { TaskTitlePropsType } from "./types";

export const TaskTitle: FC<TaskTitlePropsType> = ({ title, onSave }) => (
  <TitleContainer>
    <BackButton to={"/"}>
      <Icon src={images.arrow} />
    </BackButton>
    <Title>{title}</Title>
    <Container>
      <Button onClick={onSave}>Save</Button>
    </Container>
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
`;

const BackButton = styled(Link)``;
const Icon = styled.img`
  transform: rotate(180deg);
  width: 100px;
`;
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Container = styled.div`
  display: flex;
`;
const Button = styled.button``;
