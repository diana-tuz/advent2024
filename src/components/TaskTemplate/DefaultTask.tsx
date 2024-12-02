import { FC } from "react";
import styled from "styled-components";

import { TaskTitle } from "../TaskTitle";
import { TaskTemplatePropsType } from "./types";

export const DefaultTask: FC<TaskTemplatePropsType> = ({ snowButton }) => {
  const title = "Hold your horses! The fun is just around the corner.";

  return (
    <Description>
      <TaskTitle title={title} snowButton={snowButton} />
    </Description>
  );
};

const Description = styled.div`
  background-color: #fcf5efba;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 15px;
  padding: 20px;
`;
