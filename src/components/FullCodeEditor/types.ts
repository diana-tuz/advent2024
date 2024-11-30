import { VariantType } from "../types";

export interface FullCodeEditorPropsType {
  variant: VariantType;
  title: string;
  description?: string[];
  comment?: string;
  list?: string[];
}
