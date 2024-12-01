import { FC } from "react";
import styled from "styled-components";
import { UserDataBlockPropsType } from "./types";

export const Task2UserData: FC<UserDataBlockPropsType> = ({
  isUserData = false,
  setUserRecipient = () => {},
  userRecipient = "",
  toggleIsUserData,
}) => (
  <UserData>
    <Button onClick={toggleIsUserData}>
      {isUserData ? "Back to Tests" : "Predict for me"}
    </Button>
    <Block $displayed={isUserData}>
      <Recipient>
        <Text>Name:</Text>
        <Input
          type="test"
          id="budget"
          value={userRecipient}
          onChange={(event) => setUserRecipient(event.target.value)}
        />
      </Recipient>
    </Block>
  </UserData>
);
const UserData = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
const Block = styled.div<{ $displayed: boolean }>`
  opacity: ${({ $displayed }) => ($displayed ? "1" : "0")};
  visibility: ${({ $displayed }) => ($displayed ? "visible" : "hidden")};
  display: flex;
  transition: all 0.5s ease-in-out;
  align-items: start;
`;

const Input = styled.input`
  width: 100%;
  padding: 5px;
`;
const Recipient = styled.div`
  display: flex;
  gap: 10px;
  margin-right: 25px;
`;
const Text = styled.p``;
const Button = styled.button`
  font-size: 20px;
`;
