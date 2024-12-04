import { FC } from "react";

import { BudgetAssistant } from "./BudgetAssistant";
import { ChristmasLights } from "./ChristmasLights";
import { CocoaCraft } from "./CocoaCraft";
import { Countdown } from "./Countdown";
import { DefaultTask } from "./DefaultTask";
import { DuplicateDecorations } from "./DuplicateDecorations";
import { ElfManipulator } from "./ElfManipulator";
import { EncryptedLetter } from "./EncryptedLetter";
import { GeneratePrediction } from "./GeneratePrediction";
import { MovieSuggestion } from "./MovieSuggestion";
import { NiceOrNaughty } from "./NiceOrNaughty";
import { OrganizeGifts } from "./OrganizeGifts";
import { PopularGift } from "./PopularGift";
import { SecretSanta } from "./SecretSanta";
import { SnowfallGenerator } from "./SnowfallGenerator";
import { TaskTemplatePropsType } from "./types";

export const TaskTemplate: FC<TaskTemplatePropsType> = ({
  variant = "1",
  snowButton,
}) => {
  const CurrentTask = tasks[variant];
  return <CurrentTask variant={variant} snowButton={snowButton} />;
};

const tasks = {
  1: BudgetAssistant,
  2: Countdown,
  3: ChristmasLights,
  4: NiceOrNaughty,
  5: CocoaCraft,
  6: MovieSuggestion,
  7: SnowfallGenerator,
  8: OrganizeGifts,
  9: EncryptedLetter,
  10: GeneratePrediction,
  11: SecretSanta,
  12: ElfManipulator,
  13: DuplicateDecorations,
  14: PopularGift,
  default: DefaultTask,
};
