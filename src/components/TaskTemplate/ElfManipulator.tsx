import { FC } from "react";

import { FullCodeEditor } from "../FullCodeEditor";

import { TaskTemplatePropsType, VariantType } from "./types";

export const ElfManipulator: FC<TaskTemplatePropsType> = ({
  variant = "1",
  snowButton,
}) => {
  const description = [
    "Today we're working at the Santa's factory!",
    "To help the elves sort gifts faster, we've bought a new RoboElf, but we still need to set up the control panel to make sure we can guide it.",
    "Your task is to implement the controls so that when a button is pressed, the elf moves one cell in the corresponding direction. However, make sure that the elf can't move beyond the boundaries of the grid!",
  ];

  const defaultCode = {
    defaultHtml: ` 
    <main class="container">
    <h1>Robot Elf Controller</h1>
    <div id="grid" class="grid"></div>
    <div class="controls">
      <button id="up" class="control-btn">⬆</button>
      <div class="horizontal-buttons">
        <button id="left" class="control-btn">⬅</button>
        <button id="down" class="control-btn">⬇</button>
        <button id="right" class="control-btn">➡</button>
      </div>
    </div>
  </main>
  `,
    defaultCss: `
      body {
  font-family: Arial, sans-serif;
  background: linear-gradient( #ffffff, #a2c2e6);
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.container {
  text-align: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(5, 60px);
  grid-template-rows: repeat(5, 60px);

  margin: 20px auto;
  position: relative;
}

.cell {
  width: 60px;
  height: 60px;
  background-color: #e2e6ea;
  border: 1px solid #ced4da;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.elf {
  width: 40px;
  height: 40px;
  background-image: url('https://www.freeiconspng.com/uploads/png-format-images-of-elves-19.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  position: absolute;
  z-index: 1;
}

.controls {
  margin-top: 20px;
}
 

 
.control-btn {
  color: green;
  border: none;
  padding: 15px 20px;
  margin: 5px;
  border-radius: 15px;
  cursor: pointer;
  font-size: 28px;
}

.control-btn:hover {
  transform: scale(1.1);
}
.control-btn:active {
  transform: scale(0.95);
}

.horizontal-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}
`,
    defaultJs: `
  document.addEventListener("DOMContentLoaded", () => {
  const gridContainer = document.getElementById("grid");

  const rows = 5;
  const cols = 5;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      if (row === Math.floor(rows / 2) && col === Math.floor(cols / 2)) {
        const elf = document.createElement("div");
        elf.classList.add("elf");
        cell.appendChild(elf);
      }

      gridContainer.appendChild(cell);
    }
  }
});
`,
  };
  const title = "RoboElf Command Station";
  const taskTitle = {
    title,
    snowButton,
  };
  const codeEditorData = {
    taskTitle,
    variant: variant as VariantType,
    description,
    snowButton,
    defaultCode,
  };
  return <FullCodeEditor {...codeEditorData} />;
};
