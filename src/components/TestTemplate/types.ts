export type AnswerType = { [key: string]: string };

export interface TestTemplatePropsType {
  test: TestItem[];
  isChecked: boolean;
  correctAnswers: AnswerType;
  selectedAnswers: AnswerType;
  onChange: (a: string, b: string) => void;
}
export type TestsDataType = {
  [key: string]: TestType;
};

export type TestType = {
  title: string;
  test: TestItem[];
  correctAnswers: AnswerType;
};

type TestItem = { id: string; question: string; answers: string[] };
