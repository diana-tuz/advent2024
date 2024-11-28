export interface UserDataBlockPropsType {
  addPresent?: () => void;
  isUserData?: boolean;
  presentsArr?: number[];
  setUserBudget?: (price: number) => void;
  setUserPresents?: (arg: any) => void;
  toggleIsUserData?: () => void;
  userBudget?: number;
  variant?: VariantType;
}

export type VariantType = "1" | "2";
