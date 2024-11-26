import { javascript } from "@codemirror/lang-javascript";
import CodeMirror from "@uiw/react-codemirror";
import { useCallback, useState } from "react";
import styled, { keyframes } from "styled-components";

export const Task = () => {
  const [userCode, setUserCode] = useState(
    `function countPresentsBudget(x, y) {
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
    [300, [100, 150, 80, 70, 50]],
    [120, [20, 15, 30, 25, 10]],
  ];
  const expectedResults = [
    "Great job! No overspending, no leftovers—just right",
    "Uh-oh, you’re overspending! Try trimming down your expenses.",
    "Looks like you’ve saved money for a little treat for yourself!",
    "Uh-oh, you’re overspending! Try trimming down your expenses.",
    "Looks like you’ve saved money for a little treat for yourself!",
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
      const preparedUserFunction = userCode.split("(x, y)")[1];

      console.log("preparedUserFunction", preparedUserFunction);
      const userFunction = new Function("x", "y", preparedUserFunction);
      const preparedTestData = isUserData ? userTestData : testData;

      const testResults = preparedTestData.map((data, index) => {
        const [x, y] = data;
        const output = userFunction(x, y);
        return {
          input: `sum: ${x}, prices: ${y}`,
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
          <h1>Калькулятор бюджету подарунків</h1>
          <button onClick={toggleIsUserData}>
            {isUserData ? "use test data" : "Use your own data"}
          </button>
          {isUserData && (
            <>
              <label htmlFor="#budget">budget: </label>
              <input
                type="number"
                id="budget"
                value={userBudget}
                onChange={(event) => setUserBudget(+event.target.value)}
              />
              {presentsArr.map((_, index) => (
                <input
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
            </>
          )}
          <p>Введіть свою функцію:</p>
          <CodeMirror
            value={userCode}
            height="50vh"
            width="70vw"
            extensions={[javascript({ jsx: true })]}
            onChange={onChange}
          />
          <br />
          <button onClick={handleRunCode}>Виконати</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {!!result && (
            <div>
              <h3>Результати тестів:</h3>

              <ul>
                {result.map((res, index) =>
                  isUserData ? (
                    <li>{res.output ? res.output : "something vent wrong"}</li>
                  ) : (
                    <li key={index}>
                      (Вхід: {res.input}, Вихід: {res.output}, Очікувано:{" "}
                      {res.expected} —{" "}
                      <strong style={{ color: res.pass ? "green" : "red" }}>
                        {res.pass ? "Успіх" : "Помилка"}
                      </strong>
                      )
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>
        <SnowContainer>
          {snows.map(
            (
              { $randomStart, $randomSize, $randomDuration, $randomDelay },
              index
            ) => (
              <Snow
                key={index}
                $randomStart={$randomStart}
                $randomSize={$randomSize}
                $randomDuration={$randomDuration}
                $randomDelay={$randomDelay}
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 999;
`;

const Snow = styled.div.attrs<{
  $randomStart: number;
  $randomSize: number;
  $randomDuration: number;
  $randomDelay: number;
}>(({ $randomStart, $randomSize, $randomDuration, $randomDelay }) => ({
  style: {
    left: `${$randomStart}%`,
    width: `${$randomSize}px`,
    height: `${$randomSize}px`,
    animationDuration: `${$randomDuration}s`,
    animationDelay: `${$randomDelay}s`,
  },
}))`
  position: absolute;
  top: -10%;
  background-color: #91e9f0;
  border-radius: 50%;
  opacity: 0.5;
  animation: ${fall} linear infinite;
  animation-timing-function: linear, ease-in-out;
`;

const Main = styled.div`
  max-width: 89vw;
  width: 90%;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 99vw;
  overflow-x: hidden;
`;
