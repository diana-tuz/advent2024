import { FC } from "react";
import styled from "styled-components";

import { UserDataBlockPropsType } from "./types";

export const Task5UserData: FC<UserDataBlockPropsType> = ({
  isUserData = false,
  setUserCups = () => {},
  setUserRecipe = () => {},
  userCups = 0,
  toggleIsUserData,
  ingredients = [""],
}) => (
  <UserData>
    <Button onClick={toggleIsUserData}>
      {isUserData ? "Back to Tests" : "Use my recipe"}
    </Button>
    <Block $displayed={isUserData}>
      <Budget>
        <Text>Cups: </Text>
        <Input
          type="number"
          id="cups"
          value={userCups}
          onChange={(event) => setUserCups(+event.target.value)}
        />
      </Budget>
      <Text>Recipe:</Text>
      <PresentsBlock>
        {ingredients.map((item, index) => (
          <Ingredient key={index} $index={index} $string={item === "name"}>
            <Text>{item}:</Text>
            <Input
              type={item === "name" ? "text" : "number"}
              onChange={(event) => {
                setUserRecipe((prevRecipe: any) => ({
                  ...prevRecipe,
                  [item]:
                    item === "name" ? event.target.value : +event.target.value,
                }));
              }}
            />
          </Ingredient>
        ))}
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
  display: grid;
  grid-template-columns: repeat(2, fr);
  gap: 10px;
  align-items: start;
  margin-left: 10px;
`;
const Input = styled.input`
  width: 150px;
  padding: 5px;
`;
const Budget = styled.div`
  display: flex;
  gap: 10px;
  margin-right: 25px;
`;
const Ingredient = styled.div<{ $string?: boolean; $index: number }>`
  display: flex;
  flex-direction: column;

  grid-column: ${({ $string, $index }) =>
    $string ? "1/2" : $index && ($index % 2 !== 0 ? "1/2" : "2/3")};
`;
const Text = styled.p``;
const Button = styled.button`
  font-size: 20px;
`;
