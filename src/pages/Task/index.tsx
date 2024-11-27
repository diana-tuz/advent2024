import { javascript } from "@codemirror/lang-javascript";
import CodeMirror from "@uiw/react-codemirror";
import { useCallback, useState } from "react";
import styled, { keyframes } from "styled-components";

export const Task = () => {
  const [userCode, setUserCode] = useState(
    `function  checkGiftBudget (budget, giftPrices) {
  /* Add your solution here */
}`
  );
  const [result, setResult] = useState<any[]>([""]);
  const [error, setError] = useState("");
  const [userBudget, setUserBudget] = useState(0);
  const [userPresents, setUserPresents] = useState<number[]>([0]);
  const userTestData = [[userBudget, userPresents]];
  const [isUserData, setIsUserData] = useState(false);
  const [presentCount, setPresentCount] = useState(2);

  const arr = Array(100).fill(0);

  const snows = arr.map(() => ({
    $randomStart: Math.random() * 100,
    $randomSize: Math.random() * 10 + 5,
    $randomDuration: Math.random() * 5 + 5,
    $randomDelay: Math.random() * 5,
  }));

  const testData = [
    [100, [15, 25, 10, 30, 20]],
    [120, [50, 40, 30, 20, 15]],
    [100, [5, 10, 15, 10, 20]],
    [, [100, 150, 80, 70, 50]],
  ];
  const expectedResults = [
    "Great job! No overspending, no leftovers—just right",
    "Uh-oh, you’re overspending! Try trimming down your expenses.",
    "Looks like you’ve saved money for a little treat for yourself!",
    "Oops! Please provide both your budget and the list of gift prices to continue.",
  ];

  const presentsArr = Array(presentCount).fill(0);

  const onChange = useCallback((val: string) => {
    setUserCode(val);
  }, []);

  const addPresent = () => setPresentCount(presentCount + 1);

  const toggleIsUserData = () => {
    setIsUserData(!isUserData);
    setUserBudget(0);
    setUserPresents([]);
    setResult([]);
  };

  const handleRunCode = () => {
    setError("");
    try {
      const preparedUserFunction = userCode.split("(budget, giftPrices)")[1];

      console.log("preparedUserFunction", preparedUserFunction);
      const userFunction = new Function(
        "budget",
        "giftPrices",
        preparedUserFunction
      );
      const preparedTestData = isUserData ? userTestData : testData;

      const testResults = preparedTestData.map((data, index) => {
        const [budget, giftPrices] = data;
        const output = userFunction(budget, giftPrices);
        return {
          input: `budget: ${budget}, giftPrices: [${giftPrices}]`,
          output,
          expected: expectedResults[index],
          pass: output === expectedResults[index],
        };
      });

      setResult(testResults);
    } catch (err: any) {
      setError(`Execution Error: ${err.message}`);
    }
  };

  return (
    <Wrapper>
      <Main>
        <div>
          <Title>Santa’s Budget Assistant</Title>
          <Container>
            <Description>
              <Text>
                Every year, as the holiday season approaches, we all become
                Santa Claus. We search for the best gifts for our loved ones.
                But to avoid losing our heads in the festive rush, it’s a good
                idea to calculate ahead of time if the cost of your chosen gifts
                fits your budget.
              </Text>
              <Text>
                So, let’s create a function to help you check if your plans
                align with your finances. Write a function called
                checkGiftBudget that takes budget (your total budget) and
                giftPrices (an array of gift costs) as its arguments.
              </Text>
              <Text>The function should return one of these messages:</Text>
              <List>
                <li>
                  "Great job! No overspending, no leftovers—just right" if the
                  total cost equals your budget.
                </li>
                <li>
                  "Looks like you’ve saved money for a little treat for
                  yourself!" if you have some money left.
                </li>
                <li>
                  "Uh-oh, you’re overspending! Try trimming down your expenses."
                  if the gifts cost more than your budget.
                </li>
                <li>
                  "Uh-oh, you’re overspending! Try trimming down your expenses."
                  if the gifts cost more than your budget.
                </li>
                <li>
                  "Oops! Please provide both your budget and the list of gift
                  prices to continue." if the function takes fewer than 2
                  arguments.
                </li>
              </List>
              <Text>
                Please don’t rename the function or its arguments! Once you're
                ready, press the button to test if it works.
              </Text>
              <Text>
                Afterward, you can click the <Span>"Use My Budget" </Span>
                button, enter your own values, and see if your budget is enough
                for all the gifts you’re planning to buy. 🎁
              </Text>

              <UserData>
                <Button onClick={toggleIsUserData}>
                  {isUserData ? "Back to Tests" : "Use My Budget"}
                </Button>

                <Block $displayed={isUserData}>
                  <Budget>
                    <Text>Budget:</Text>
                    <Input
                      type="number"
                      id="budget"
                      value={userBudget}
                      onChange={(event) => setUserBudget(+event.target.value)}
                    />
                  </Budget>
                  <Text>Presents:</Text>
                  <PresentsBlock>
                    {presentsArr.map((_, index) => (
                      <Input
                        type="number"
                        key={index}
                        onChange={(event) => {
                          setUserPresents((prevPresents) => [
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
            </Description>
            <CodeMirrorWrapper>
              <CodeMirror
                value={userCode}
                height="50vh"
                extensions={[javascript({ jsx: true })]}
                onChange={onChange}
              />
              <Button onClick={handleRunCode}>Let's Calculate</Button>
              <Results>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {!!result.length && (
                  <div>
                    <h3>
                      {isUserData ? "Results of your code:" : "Test results:"}
                    </h3>

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
                              <strong
                                style={{ color: res.pass ? "green" : "red" }}
                              >
                                {res.pass ? " Success" : " Error"}
                              </strong>
                            </p>
                          </ResultItem>
                        )
                      )}
                    </ResultsContainer>
                  </div>
                )}
              </Results>
            </CodeMirrorWrapper>
          </Container>
        </div>
        <SnowContainer>
          {snows.map(
            (
              { $randomDelay, $randomDuration, $randomSize, $randomStart },
              index
            ) => (
              <Snow
                key={index}
                $randomDelay={$randomDelay}
                $randomDuration={$randomDuration}
                $randomSize={$randomSize}
                $randomStart={$randomStart}
              />
            )
          )}
        </SnowContainer>
      </Main>
    </Wrapper>
  );
};

const fall = keyframes` 
  to  {
    transform: translateY(110vh) rotate(360deg);
  }
`;

const SnowContainer = styled.div`
  height: 100%;
  left: 0;
  overflow: hidden;
  pointer-events: none;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
`;

const ResultsContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  margin-top: 25px;
`;

const ResultItem = styled.li`
  display: flex;
  flex-direction: column;
  width: 20vw;
`;

const Snow = styled.div.attrs<{
  $randomDelay: number;
  $randomDuration: number;
  $randomSize: number;
  $randomStart: number;
}>(({ $randomStart, $randomSize, $randomDuration, $randomDelay }) => ({
  style: {
    animationDelay: `${$randomDelay}s`,
    animationDuration: `${$randomDuration}s`,
    height: `${$randomSize}px`,
    left: `${$randomStart}%`,
    width: `${$randomSize}px`,
  },
}))`
  animation-timing-function: linear, ease-in-out;
  animation: ${fall} linear infinite;
  background-color: #91e9f0;
  border-radius: 50%;
  opacity: 0.5;
  position: absolute;
  top: -10%;
`;

const Main = styled.div`
  max-width: 89vw;
  width: 90%;
`;

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 100vh;
  overflow-y: hidden;
  width: 99vw;
`;

const Title = styled.h1`
  text-shadow: 0 0 10px #4f775d;
  color: #454f47;
  font-size: 70px;
  text-decoration: underline dotted;
  margin-bottom: 20px;
  text-align: center;
`;
const Container = styled.div`
  display: flex;
  /* gap: 20px; */
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
const CodeMirrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 20px;
`;

const Description = styled.div`
  background-color: #fcf5efba;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 15px;
  padding: 20px;
`;

const Text = styled.p`
  font-size: 1vw;
`;

const List = styled.ul`
  color: #cc322a;
  display: flex;
  flex-direction: column;
  font-size: 1vw;
  gap: 10px;
  padding-left: 30px;
`;

const Button = styled.button`
  font-size: 20px;
`;

const UserData = styled.div`
  display: flex;
  align-items: start;
  gap: 30px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
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

const Span = styled.span`
  color: #314939;
  font-weight: 700;
`;

const Block = styled.div<{ $displayed: boolean }>`
  opacity: ${({ $displayed }) => ($displayed ? "1" : "0")};
  visibility: ${({ $displayed }) => ($displayed ? "visilbe" : "hidden")};
  display: flex;
  transition: all 0.5s ease-in-out;
  align-items: start;
`;

const Results = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fcf5efba;
  padding: 0 20px;
`;
