import { FC } from "react";

import { FullCodeEditor } from "../FullCodeEditor";

import { TaskTemplatePropsType, VariantType } from "./types";

export const ChristmasLights: FC<TaskTemplatePropsType> = ({
  variant = "1",
}) => {
  const description = [
    "The holiday season is here, and it's time to light up the Christmas spirit! Let’s create a beautiful Christmas light display using HTML, CSS, and JavaScript.",
  ];
  const comment =
    "Let your lights shine bright and fill the season with joy — because nothing says Christmas like a glowing, twinkling display!✨";

  const list = [
    "HTML: Create the basic structure of the lights using <div> elements, each representing a light bulb.",
    "CSS: Style each light bulb to look like a small colorful ball. Use animation to make the bulbs 'blink' (change colors).",
    "JavaScript: Add functionality to turn the lights on and off using a button. When the lights are on, the bulbs should start blinking.",
    "Additional Features: You can add buttons to change the color of the bulbs (e.g., red, green, yellow, blue) or add an option to adjust the speed of the blinking.",
  ];
  const title = "Christmas lights";
  const codeEditorData = {
    title,
    variant: variant as VariantType,
    comment,
    list,
    description,
  };
  return <FullCodeEditor {...codeEditorData} />;
};
