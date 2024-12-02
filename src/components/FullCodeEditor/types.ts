import { VariantType } from "../types";

export interface FullCodeEditorPropsType {
  variant: VariantType;
  title: string;
  description?: string[];
  comment?: string;
  list?: string[];
  defaultCode?: CodeType;
}

type CodeType = {
  defaultHtml?: string;
  defaultCss?: string;
  defaultJs?: string;
};
