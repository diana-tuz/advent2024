import { FC } from "react";

import { FullCodeEditor } from "../FullCodeEditor";

import { TaskTemplatePropsType, VariantType } from "./types";

export const ChristmasLights: FC<TaskTemplatePropsType> = ({
  variant = "1",
  snowButton,
}) => {
  const description = [
    "Have you already taken your Christmas lights out of the closet? It's time!",
    "Below, we've included a festive garland using HTML and CSS. Feel free to use it or create your own, and bring it to life with a blinking effect!",
    "If you're up for a challenge, why not go the extra mile? Add a button to turn the lights on and off, switch between blinking modes, or even change the colors to make it truly magical! 🎄✨",
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

  const taskTitle = {
    title,
    snowButton,
  };
  const codeEditorData = {
    variant: variant as VariantType,
    description,
    defaultCode,
    taskTitle,
  };
  return <FullCodeEditor {...codeEditorData} />;
};
