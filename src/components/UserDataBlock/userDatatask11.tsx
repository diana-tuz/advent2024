import { FC } from "react";
import styled from "styled-components";
import { UserDataBlockPropsType } from "./types";

export const Task11UserData: FC<UserDataBlockPropsType> = ({
  addName,
  isUserData = false,
  namesArr,
  setUserPresents = () => {},
  toggleIsUserData,
}) => (
  <UserData>
    <Button onClick={toggleIsUserData}>
      {isUserData ? "Back to Tests" : "Use My Budget"}
    </Button>
    <Block $displayed={isUserData}>
      <Text>People:</Text>
      <InputsBlock>
        {namesArr &&
          namesArr.map((_, index) => (
            <Input
              type="text"
              key={index}
              onChange={(event) => {
                setUserPresents((prevPresents: any) => [
                  ...prevPresents,
                  +event.target.value,
                ]);
              }}
            />
          ))}
        <button onClick={addName}>+</button>
      </InputsBlock>
    </Block>
  </UserData>
);
const UserData = styled.div`
  display: flex;
  align-items: start;
  gap: 30px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
const Block = styled.div<{ $displayed: boolean }>`
  opacity: ${({ $displayed }) => ($displayed ? "1" : "0")};
  visibility: ${({ $displayed }) => ($displayed ? "visilbe" : "hidden")};
  display: flex;
  transition: all 0.5s ease-in-out;
  align-items: start;
`;
const InputsBlock = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  gap: 10px;
  align-items: center;
  margin-left: 10px;
`;
const Input = styled.input`
  width: 100%;
  padding: 5px;
`;

const Text = styled.p``;
const Button = styled.button`
  font-size: 20px;
`;
