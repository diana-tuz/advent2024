import { FC } from "react";

import { ChristmasLights } from "./ChristmasLights";
import { CocoaCraft } from "./CocoaCraft";
import { Countdown } from "./Countdown";
import { DefaultTask } from "./DefaultTask";
import { DuplicateDecorations } from "./DuplicateDecorations";
import { ElfManipulator } from "./ElfManipulator";
import { EncryptedLetter } from "./EncryptedLetter";
import { FilterTasks } from "./FilterTasks";
import { GeneratePrediction } from "./GeneratePrediction";
import { LongestSongTitle } from "./LongestSongTitle";
import { MovieSuggestion } from "./MovieSuggestion";
import { NiceOrNaughty } from "./NiceOrNaughty";
import { OrganizeGifts } from "./OrganizeGifts";
import { Palindrome } from "./Palindrome";
import { PopularGift } from "./PopularGift";
import { SecretSanta } from "./SecretSanta";
import { SnowfallGenerator } from "./SnowfallGenerator";
import { WordOccurrences } from "./WordOccurrences";

import { BudgetAssistant } from "./BudgetAssistant";
import { CalculateShoppingList } from "./CalculateShoppingList";
import { FindOrderNumber } from "./FindOrderNumber";
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
  6: FilterTasks,
  7: ElfManipulator,
  8: PopularGift,
  9: OrganizeGifts,
  10: GeneratePrediction,
  11: SecretSanta,
  12: SnowfallGenerator,
  13: DuplicateDecorations,
  14: EncryptedLetter,
  15: MovieSuggestion,
  16: Palindrome,
  17: LongestSongTitle,
  18: WordOccurrences,
  19: CalculateShoppingList,
  20: FindOrderNumber,
  default: DefaultTask,
};
