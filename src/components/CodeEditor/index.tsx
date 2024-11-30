import { javascript } from "@codemirror/lang-javascript";
import CodeMirror from "@uiw/react-codemirror";
import { FC, useCallback } from "react";
import styled from "styled-components";
import { CodeEditorPropsType } from "./types";

export const CodeEditor: FC<CodeEditorPropsType> = ({
  buttonTitle,
  error,
  handleRunCode,
  isUserData,
  result,
  setUserCode,
  userCode,
  variant,
}) => {
  const onChange = useCallback((val: string) => {
    setUserCode(val);
    localStorage.setItem(variant, val);
  }, []);
  return (
    <CodeMirrorWrapper>
      <CodeMirror
        value={userCode}
        height="50vh"
        extensions={[javascript({ jsx: true })]}
        onChange={onChange}
      />
      <Button onClick={handleRunCode}>
        {buttonTitle ? buttonTitle : "Run"}
      </Button>
      <Results>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {(result.length > 1 || isUserData) && (
          <>
            <h3>{isUserData ? "Result of your code:" : "Test results:"}</h3>
            <ResultsContainer>
              {result.map(({ output, input, expected, pass }, index) => {
                const preparedOutput =
                  variant === "5"
                    ? output
                        .split("")
                        .filter(
                          (item: string) =>
                            item !== "{" && item !== "}" && item !== '"'
                        )
                        .map((item: string) =>
                          item === ":" ? `${item.charAt(0)} ` : item
                        )
                        .join("")
                        .split(",")
                    : output;
                return isUserData ? (
                  <ResultItem>
                    {output
                      ? preparedOutput.map((item: string) => (
                          <ResultItem>{item}</ResultItem>
                        ))
                      : "something vent wrong"}
                  </ResultItem>
                ) : (
                  <ResultItem key={index}>
                    <Text> Test {index + 1}:</Text>
                    <p>
                      <Span>Input: </Span>
                      {input}
                    </p>
                    <p>
                      <Span>Output:</Span>
                      {output ? output : "___"}
                    </p>
                    {expected && (
                      <p>
                        <Span>Expected:</Span> {expected}
                      </p>
                    )}
                    <p>
                      <Span>Test result:</Span>
                      <strong style={{ color: pass ? "green" : "red" }}>
                        {pass ? " Success" : " Error"}
                      </strong>
                    </p>
                  </ResultItem>
                );
              })}
            </ResultsContainer>
          </>
        )}
      </Results>
    </CodeMirrorWrapper>
  );
};

export default CodeEditor;

const CodeMirrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 20px;
`;
const Results = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fcf5efba;
  padding: 0 20px;
`;
const ResultsContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  margin-top: 25px;
`;

const ResultItem = styled.li`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Button = styled.button`
  font-size: 20px;
`;

const Text = styled.p`
  font-size: 1vw;
`;

const Span = styled.span`
  color: #314939;
  font-weight: 700;
`;
