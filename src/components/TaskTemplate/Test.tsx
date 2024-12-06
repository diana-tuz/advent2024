import { FC, useState } from "react";
import styled from "styled-components";

import { tests } from "../../constants";
import { TaskTitle } from "../TaskTitle";
import { TestTemplate } from "../TestTemplate";
import { TestTemplatePropsType } from "../TestTemplate/types";
import { objectsEqual } from "../tools";
import { TaskTemplatePropsType } from "./types";

export type AnswerType = { [key: string]: string };

export const Test: FC<TaskTemplatePropsType> = ({
  snowButton,
  variant = "8",
}) => {
  const data = tests[variant];
  const { title, test, correctAnswers } = data;

  const [selectedAnswers, setSelectedAnswers] = useState<AnswerType>({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
    q8: "",
    q9: "",
    q10: "",
    q11: "",
    q12: "",
  });

  const isPassed = objectsEqual(selectedAnswers, correctAnswers);

  const onChange = (questionId: string, answer: string) => {
    setIsChecked(false);
    setSelectedAnswers((prevData) => ({
      ...prevData,
      [questionId]: answer,
    }));
  };
  const [isChecked, setIsChecked] = useState(false);

  const onCheck = () => setIsChecked(true);

  const testTemplate: TestTemplatePropsType = {
    test,
    onChange,
    correctAnswers,
    selectedAnswers,
    isChecked,
  };

  return (
    <>
      <TaskTitle title={title} snowButton={snowButton} />
      <Container>
        <TestTemplate {...testTemplate} />
        {isChecked && (
          <Message>
            {isPassed
              ? "Congratulations! Everything is correct!"
              : "Oops! Look's like you have a mistake!"}
          </Message>
        )}
        <Button onClick={onCheck}>Check</Button>
      </Container>
    </>
  );
};
const Message = styled.p`
  font-size: 35px;
  color: #cc322a;
`;

const Container = styled.div`
  background-color: #fcf5efba;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  gap: 15px;
  padding: 20px;
`;

const Button = styled.button`
  width: 30vw;
  font-size: 30px;
`;
