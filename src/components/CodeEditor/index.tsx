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
}) => {
  const onChange = useCallback((val: string) => {
    setUserCode(val);
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
        {!!result.length && (
          <>
            <h3>{isUserData ? "Results of your code:" : "Test results:"}</h3>

            <ResultsContainer>
              {result.map((res, index) =>
                isUserData ? (
                  <ResultItem>
                    {res.output ? res.output : "something vent wrong"}
                  </ResultItem>
                ) : (
                  <ResultItem key={index}>
                    <Text> Test {index + 1}:</Text>
                    <p>
                      <Span>Input: </Span>
                      {res.input}
                    </p>
                    <p>
                      <Span>Output:</Span>
                      {res.output ? res.output : "___"}
                    </p>
                    <p>
                      <Span>Expected:</Span> {res.expected}
                    </p>
                    <p>
                      <Span>Test result:</Span>
                      <strong style={{ color: res.pass ? "green" : "red" }}>
                        {res.pass ? " Success" : " Error"}
                      </strong>
                    </p>
                  </ResultItem>
                )
              )}
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
  flex-wrap: wrap;
  gap: 10px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  margin-top: 25px;
`;

const ResultItem = styled.li`
  display: flex;
  flex-direction: column;
  width: 18vw;
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
