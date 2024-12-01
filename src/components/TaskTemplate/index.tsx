import { FC } from "react";

import { BudgetAssistant } from "./BudgetAssistant";
import { ChristmasLights } from "./ChristmasLights";
import { CocoaCraft } from "./CocoaCraft";
import { Countdown } from "./Countdown";
import { DefaultTask } from "./DefaultTask";
import { MovieSuggestion } from "./MovieSuggestion";
import { NiceOrNaughty } from "./NiceOrNaughty";
import { OrganizeGifts } from "./OrganizeGifts";
import { SnowfallGenerator } from "./SnowfallGenerator";
import { TaskTemplatePropsType } from "./types";

export const TaskTemplate: FC<TaskTemplatePropsType> = ({ variant = "1" }) => {
  const CurrentTask = tasks[variant];
  return <CurrentTask variant={variant} />;
};

const tasks = {
  1: BudgetAssistant,
  2: Countdown,
  3: ChristmasLights,
  4: NiceOrNaughty,
  5: CocoaCraft,
  6: SnowfallGenerator,
  7: MovieSuggestion,
  8: OrganizeGifts,
  default: DefaultTask,
};
