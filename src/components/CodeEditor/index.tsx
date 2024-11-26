import { javascript } from "@codemirror/lang-javascript";
import CodeMirror from "@uiw/react-codemirror";
import { useCallback, useState } from "react";

const CodeEditor = () => {
  const [value, setValue] = useState("");
  const onChange = useCallback((val: string) => {
    setValue(val);
  }, []);
  return (
    <CodeMirror
      value={value}
      height="200px"
      extensions={[javascript({ jsx: true })]}
      onChange={onChange}
    />
  );
};

export default CodeEditor;
