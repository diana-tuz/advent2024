export interface UserDataBlockPropsType {
  addPresent?: () => void;
  isUserData?: boolean;
  presentsArr?: number[];
  setUserBudget?: (price: number) => void;
  setUserCups?: (amount: number) => void;
  setUserPresents?: (arg: any) => void;
  setUserRecipe?: (arg: any) => void;
  toggleIsUserData?: () => void;
  userBudget?: number;
  userCups?: number;
  variant?: UserDataVariantType;
  ingredients?: string[];
}

export type UserDataVariantType = "1" | "5";
