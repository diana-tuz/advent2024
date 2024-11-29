import { FC } from "react";

import { Task1UserData } from "./userDatatask1";

import { UserDataBlockPropsType } from "./types";
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
};
