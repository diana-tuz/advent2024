export interface UserDataBlockPropsType {
  addPresent?: () => void;
  isUserData?: boolean;
  presentsArr?: number[];
  setUserBudget?: (price: number) => void;
  setUserPresents?: (arg: any) => void;
  toggleIsUserData?: () => void;
  userBudget?: number;
  variant?: UserDataVariantType;
}

export type UserDataVariantType = "1" | "2";
