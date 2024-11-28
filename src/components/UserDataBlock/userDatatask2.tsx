import { FC } from "react";
import styled from "styled-components";
import { UserDataBlockPropsType } from "./types";

export const Task2UserData: FC<UserDataBlockPropsType> = ({
  addPresent,
  isUserData = false,
  presentsArr,
  setUserBudget = () => {},
  setUserPresents = () => {},
  userBudget = 0,
  toggleIsUserData,
}) => (
  <UserData>
    <Button onClick={toggleIsUserData}>
      {isUserData ? "Back to Tests 2 " : "Use My Budget 2"}
    </Button>
    <Block $displayed={isUserData}>
      <Budget>
        <Text>Budget 2:</Text>
        <Input
          type="number"
          id="budget"
          value={userBudget}
          onChange={(event) => setUserBudget(+event.target.value)}
        />
      </Budget>
      <Text>Presents:</Text>
      <PresentsBlock>
        {presentsArr &&
          presentsArr.map((_, index) => (
            <Input
              type="number"
              key={index}
              onChange={(event) => {
                setUserPresents((prevPresents: any) => [
                  ...prevPresents,
                  +event.target.value,
                ]);
              }}
            />
          ))}
        <button onClick={addPresent}>+</button>
      </PresentsBlock>
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
const PresentsBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 300px;
  gap: 10px;
  align-items: start;
  margin-left: 10px;
`;
const Input = styled.input`
  width: 50px;
  padding: 5px;
`;
const Budget = styled.div`
  display: flex;
  gap: 10px;
  margin-right: 25px;
`;
const Text = styled.p`
  font-size: 1vw;
`;
const Button = styled.button`
  font-size: 20px;
`;
