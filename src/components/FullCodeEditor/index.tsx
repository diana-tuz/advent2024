import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import CodeMirror from "@uiw/react-codemirror";
import { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { TaskTitle } from "../TaskTitle";
import { FullCodeEditorPropsType } from "./types";

type MirrorType = "html" | "css" | "js";

export const FullCodeEditor: FC<FullCodeEditorPropsType> = ({
  variant,
  title,
  description,
  comment,
  list,
}) => {
  const initialHtml = localStorage.getItem(`${variant}Html`);
  const initialCss = localStorage.getItem(`${variant}Css`);
  const initialJs = localStorage.getItem(`${variant}Js`);
  const [htmlContent, setHtmlContent] = useState(
    initialHtml ? initialHtml : ""
  );
  const [cssContent, setCssContent] = useState(initialCss ? initialCss : "");
  const [jsContent, setJsContent] = useState(initialJs ? initialJs : "");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [displayedCodeMirror, setDisplayedCodeMirror] =
    useState<MirrorType>("html");
  const isHtml = displayedCodeMirror === "html";
  const isCss = displayedCodeMirror === "css";
  const isJs = displayedCodeMirror === "js";
  const [mode, setMode] = useState(true);
  useEffect(() => {
    const iframe = iframeRef.current;
    const documentContent = `
      <html>
        <head>
          <style>${cssContent}</style>
        </head>
        <body>
          ${htmlContent}
          <script>${jsContent}</script>
        </body>
      </html>
    `;
    const iframeDoc =
      iframe?.contentDocument || iframe?.contentWindow?.document;
    if (iframeDoc) {
      iframeDoc.open();
      iframeDoc.write(documentContent);
      iframeDoc.close();
    }
  }, [htmlContent, cssContent, jsContent]);
  const variants: MirrorType[] = ["html", "css", "js"];

  const mirrorsData = [
    {
      displayed: isHtml,
      value: htmlContent,
      name: "html",
      onChange: setHtmlContent,
      extensions: [html()],
    },
    {
      displayed: isCss,
      value: cssContent,
      name: "css",
      onChange: setCssContent,
      extensions: [css()],
    },
    {
      displayed: isJs,
      value: jsContent,
      name: "js",
      onChange: setJsContent,
      extensions: [javascript()],
    },
  ];
  const onSave = () => {
    localStorage.setItem(`${variant}Html`, htmlContent);
    localStorage.setItem(`${variant}Css`, cssContent);
    localStorage.setItem(`${variant}Js`, jsContent);
  };

  return (
    <Container>
      <TaskTitle title={title} onSave={onSave} />
      <Description>
        {description &&
          description.map((text, index) => <Text key={index}>{text}</Text>)}
        <List>
          {list && list.map((text, index) => <li key={index}>{text}</li>)}
        </List>
        {comment && <Text>{comment}</Text>}
      </Description>
      <CodeContainer>
        <CodeWrapper>
          <TopWrapper>
            <ButtonsWrapper>
              <div>
                {variants.map((variant) => (
                  <Button
                    key={variant}
                    $active={displayedCodeMirror === variant}
                    onClick={() => setDisplayedCodeMirror(variant)}
                  >
                    {variant}
                  </Button>
                ))}
              </div>
              <ToggleButton onClick={() => setMode(!mode)} $isLight={mode}>
                {mode ? "Dark Mode" : "Light Mode"}
              </ToggleButton>
            </ButtonsWrapper>
          </TopWrapper>
          {mirrorsData.map(
            ({ displayed, extensions, value, onChange }, index) => (
              <Wrapper key={index}>
                {displayed && (
                  <CodeMirror
                    height="70vh"
                    value={value}
                    theme={mode ? "light" : "dark"}
                    extensions={extensions}
                    onChange={(value) => onChange(value)}
                  />
                )}
              </Wrapper>
            )
          )}
        </CodeWrapper>
        <PreviewContainer>
          <PreviewTitle>Preview</PreviewTitle>
          <Iframe ref={iframeRef} title="output" style={{}}></Iframe>
        </PreviewContainer>
      </CodeContainer>
    </Container>
  );
};

const PreviewTitle = styled.h3`
  color: #cc322a;
  font-size: 2vw;
`;

const Iframe = styled.iframe`
  background-color: white;
  height: 100%;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Wrapper = styled.div`
  max-width: 40vw;
  overflow: auto;
`;

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  width: 100%;
`;

const CodeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const CodeContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 20px;
  height: 80vh;
  padding: 20px;
`;

const TopWrapper = styled.div`
  display: flex;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const Button = styled.button<{ $active: boolean }>`
  background-color: ${({ $active }) => ($active ? "#f8eee1" : "#80502c")};
  border: ${({ $active }) => `3px solid ${!$active ? "#f8eee1" : "#80502c"}`};
  color: ${({ $active }) => (!$active ? "#f8eee1" : "#80502c")};
  min-width: 5vw;
  text-transform: uppercase;
`;

const ToggleButton = styled.button<{ $isLight: boolean }>`
  background-color: ${({ $isLight }) => ($isLight ? "#f8eee1" : "#80502c")};
  border: ${({ $isLight }) => `3px solid ${!$isLight ? "#f8eee1" : "#80502c"}`};
  color: ${({ $isLight }) => (!$isLight ? "#f8eee1" : "#80502c")};
`;

const Description = styled.div`
  background-color: #fcf5efba;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 15px;
  padding: 20px;
`;

const Text = styled.p``;

const List = styled.ul`
  display: flex;
  flex-direction: column;

  gap: 10px;
  padding-left: 30px;
  color: #cc322a;
`;
