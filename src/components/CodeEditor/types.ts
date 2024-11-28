import { VariantType } from "../types";

export interface CodeEditorPropsType {
  buttonTitle?: string;
  error: string;
  handleRunCode: () => void;
  isUserData?: boolean;
  result: any[];
  setUserCode: (arg: string) => void;
  userCode: string;
  variant: VariantType | string;
}
