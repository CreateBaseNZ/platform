import { useState } from "react";
import dynamic from "next/dynamic";
import TextEditor from "./TextEditor";
import { initialElements } from "../utils/flowConfig";

import classes from "./Workspace.module.scss";

const flow2Text = (elements) => {
  // let blocksConfig = [];
  // let currentNode = elements[0];
  // let traverse = true;
  // while (traverse) {
  //   let block = {
  //     robot: "Arm",
  //     value: { ...data[currentNode.id] },
  //     type: currentNode.type,
  //   };
  //   switch (currentNode.type) {
  //     case "move":
  //       block = {
  //         ...block,
  //         name: "MoveArm",
  //       };
  //       break;
  //     case "gravity":
  //       block = {
  //         ...block,
  //         name: "GravitySwitch",
  //       };
  //       block.type = "move";
  //       break;
  //     default:
  //       break;
  //   }
  //   blocksConfig.push(block);
  //   const nextNode = getOutgoers(currentNode, elements);
  //   if (nextNode.length > 1) {
  //     return "multiple_tracks";
  //   } else if (nextNode[0]) {
  //     currentNode = nextNode[0];
  //   } else {
  //     traverse = false;
  //     break;
  //   }
  // }
  // if (blocksConfig[blocksConfig.length - 1].type !== "end") {
  //   return "disconnected";
  // }
  // return blocksConfig;
};

const TabBar = dynamic(() => import("./TabBar"), {
  ssr: false,
});

const FlowEditor = dynamic(() => import("./ReactFlow/FlowEditor"), {
  ssr: false,
});

const Workspace = (props) => {
  const [activeTab, setActiveTab] = useState("flow");
  const [elements, setElements] = useState(initialElements);
  const [text, setText] = useState("// Let's code! 💡");

  const changeTabHandler = (tab) => {
    if (tab === "text") {
      // run flow2Text()
      // run compile to code - return the code (or error status if error)
      // setText(the code)
      setText("// Let's code! 💡");
      // if error status -> console log error message
      // flash the console tab
      // setText("// Ooops! There was a problem converting to code. See Console for more info")
    } else {
      setText("// Let's code! 💡");
    }
    setActiveTab(tab);
  };

  return (
    <div className={classes.workspace}>
      <FlowEditor
        show={activeTab === "flow"}
        elements={elements}
        setElements={setElements}
      />
      <TextEditor show={activeTab === "text"} text={text} />
      <TabBar
        stacked={props.stacked}
        active={activeTab}
        onChange={changeTabHandler}
      />
    </div>
  );
};

export default Workspace;
