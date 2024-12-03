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
                return isUserData ? (
                  <ResultItem key={index}>
                    {output ? (
                      <ResultItem>{output}</ResultItem>
                    ) : (
                      "something vent wrong"
                    )}
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
  max-width: 45vw;
  @media screen and (max-width: 768px) {
    min-width: 90vw;
  }
`;

const Results = styled.div`
  background-color: #fcf5efba;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`;

const ResultsContainer = styled.ul`
  display: flex;
  flex-direction: column;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  gap: 10px;
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

const Text = styled.p``;

const Span = styled.span`
  color: #314939;
  font-weight: 700;
`;
