export interface UserDataBlockPropsType {
  addPresent?: () => void;
  addName?: () => void;
  isUserData?: boolean;
  presentsArr?: number[];
  namesArr?: string[];
  setUserBudget?: (price: number) => void;
  setUserCups?: (amount: number) => void;
  setUserRecipient?: (name: string) => void;
  setUserPresents?: (arg: any) => void;
  setUserRecipe?: (arg: any) => void;
  toggleIsUserData?: () => void;
  userBudget?: number;
  userCups?: number;
  variant?: UserDataVariantType;
  ingredients?: string[];
  userRecipient?: string;
  userTestData?: string[];
}

export type UserDataVariantType = "1" | "5" | "10" | "11";
