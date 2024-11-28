import { CodeEditorPropsType } from "../CodeEditor/types";
import { UserDataBlockPropsType } from "../UserDataBlock/types";

export interface TaskTemplatePropsType {
  codeEditor: CodeEditorPropsType;
  coments?: string[];
  description: string[];
  list?: string[];
  title: string;
  userData?: UserDataBlockPropsType;
}
