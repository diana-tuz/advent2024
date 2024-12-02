import { TaskTitlePropsType, VariantType } from "../types";

export interface FullCodeEditorPropsType {
  variant: VariantType;
  description?: string[];
  comment?: string;
  list?: string[];
  defaultCode?: CodeType;
  taskTitle: TaskTitlePropsType;
}

type CodeType = {
  defaultHtml?: string;
  defaultCss?: string;
  defaultJs?: string;
};
