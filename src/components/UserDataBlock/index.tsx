import { FC } from "react";

import { Task1UserData } from "./userDatatask1";

import { UserDataBlockPropsType } from "./types";
import { Task2UserData } from "./userDatatask10";
import { Task11UserData } from "./userDatatask11";
import { Task5UserData } from "./userDatatask5";

export const UserDataBlock: FC<UserDataBlockPropsType> = ({
  variant = "1",
  ...props
}) => {
  const UserData = variants[variant];

  return !!UserData && <UserData {...props} />;
};

const variants = {
  1: Task1UserData,
  5: Task5UserData,
  10: Task2UserData,
  11: Task11UserData,
};
