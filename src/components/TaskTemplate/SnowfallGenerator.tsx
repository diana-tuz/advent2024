import { FC } from "react";

import { FullCodeEditor } from "../FullCodeEditor";

import { TaskTemplatePropsType, VariantType } from "./types";

export const SnowfallGenerator: FC<TaskTemplatePropsType> = ({
  variant = "1",
}) => {
  const description = [
    "The holiday season wouldn’t be complete without a magical snowfall! Let’s create a beautiful snowstorm effect using HTML, CSS, and JavaScript.",
  ];
  const comment =
    "Let the snowflakes gently fall, creating a winter wonderland right on your screen!";
  const list = [
    "HTML: Create a container (e.g., a div) that will hold the falling snowflakes.",
    "CSS: Style the snowflakes to look like small, white, circular elements. Use CSS animations to make the snowflakes fall from top to bottom of the screen.",
    "JJavaScript: Add functionality to generate random snowflakes of different sizes and at different speeds. The snowflakes should randomly appear at the top of the screen and fall down, creating a snowy effect.",
    "Additional Features:Add a button to start and stop the snowfall. Customize the snowfall intensity (how many snowflakes fall at once).",
  ];
  const title = "Let it snow!";
  const codeEditorData = {
    title,
    variant: variant as VariantType,
    comment,
    list,
    description,
  };
  return <FullCodeEditor {...codeEditorData} />;
};
