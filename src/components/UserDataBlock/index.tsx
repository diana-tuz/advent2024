import { FC } from "react";

import { Task1UserData } from "./userDatatask1";
import { Task2UserData } from "./userDatatask2";

import { UserDataBlockPropsType } from "./types";

export const UserDataBlock: FC<UserDataBlockPropsType> = ({
  variant = "1",
  ...props
}) => {
  const UserData = variants[variant];

  return !!UserData && <UserData {...props} />;
};

const variants = {
  1: Task1UserData,
  2: Task2UserData,
};
