import { FC } from "react";
import styled from "styled-components";
import { images } from "../../assets";
import { TestTemplatePropsType } from "./types";

export const TestTemplate: FC<TestTemplatePropsType> = ({
  test,
  isChecked,
  selectedAnswers,
  correctAnswers,
  onChange,
}) => (
  <TestContainer>
    {test.map(({ id, question, answers }) => (
      <Test key={id}>
        <Question>{question}</Question>
        <AnswersContainer>
          {answers.map((answer, index) => (
            <Option>
              <RadioButton
                $isPassed={answer === correctAnswers[id]}
                $isChecked={isChecked}
                type="radio"
                checked={selectedAnswers[id] === answer}
                value={answer}
                onChange={(event) => onChange(id, event.target.value)}
                id={index.toString()}
              />
              <Answer
                onClick={() => onChange(id, answer)}
                $isSelectedAnswer={selectedAnswers[id] === answer}
                $isPassed={answer === correctAnswers[id]}
                $isChecked={isChecked}
              >
                {answer}
              </Answer>
            </Option>
          ))}
        </AnswersContainer>
      </Test>
    ))}
  </TestContainer>
);

const TestContainer = styled.ol`
  display: flex;
  flex-wrap: wrap;
`;
const AnswersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Test = styled.li`
  width: 40vw;
  margin-bottom: 50px;
  font-size: 20px;
`;

const Question = styled.p`
  font-size: 24px;
`;
const RadioButton = styled.input<{ $isPassed: boolean; $isChecked: boolean }>`
  appearance: none;
  width: 40px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid black;

  &:checked {
    border: none;

    background: ${({ $isChecked, $isPassed }) => `url(
      ${
        $isChecked
          ? $isPassed
            ? images.correct
            : images.incorrect
          : images.snowFlake
      })`};
    background-size: contain;
    background-repeat: no-repeat;
  }
`;
const Answer = styled.p<{
  $isPassed: boolean;
  $isChecked: boolean;
  $isSelectedAnswer: boolean;
}>`
  color: ${({ $isPassed, $isChecked, $isSelectedAnswer }) =>
    $isChecked ? $isSelectedAnswer && ($isPassed ? "green" : "red") : "#000"};
  font-family: "Times New Roman", Times, serif;
  width: 100%;
  cursor: pointer;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;
