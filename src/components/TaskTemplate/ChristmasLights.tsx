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
  const defaultCode = {
    defaultHtml: `<div class="main">
    <div class="circle red"></div>
    <div class="circle yellow"></div>
    <div class="circle blue"></div>
    <div class="circle green"></div>
    <div class="circle red"></div>
    <div class="circle yellow"></div>
    <div class="circle blue"></div>
    <div class="circle green"></div>
  </div>
</div>`,
    defaultCss: `* {
  box-sizing: border-box;
}

body {
  background: rgb(25, 21, 26);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
  overflow: hidden;
}

.main {
  border-radius: 25px;
  height: 20vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.circle {
  display: flex;
  margin: 1rem;
  border-radius: 50%;
  height: 70px;
  width: 50px;
  background: rgba(0, 0, 0, 0.3);
  position: relative;
  transition: 1s all ease;
}

.circle:before {
  content: ''; 
  position: absolute;
  height: 15px;
  width: 15px;
  left: 17.5px;
  top: -15px;
  background: rgb(68, 53, 73);
  border-radius: 3px;
  border-bottom: 2px solid rgb(97, 81, 107);
}

.circle:after {
  content: "";
  position: absolute;
  top: -20px;
  left: 30px;
  width: 70px;
  height: 20px;
  border-bottom: solid #222 2px;
  border-radius: 50%;
}

.circle:last-child::after {
  content: '';
  position: absolute;
  border: none;
}

.red {
  background-color: #cc322a;
  animation: glow-1 1s infinite;
}

.yellow {
  background-color: #FDD835;
  animation: glow-2 1s infinite;
}

.blue {
  background-color: #27cdd3;
  animation: glow-3 1s infinite;
}

.green {
  background-color: #27d335;
  animation: glow-4 1s infinite;
}

`,
    defaultJs: "",
  };
  const codeEditorData = {
    title,
    variant: variant as VariantType,
    comment,
    list,
    description,
    defaultCode,
  };
  return <FullCodeEditor {...codeEditorData} />;
};
