import { useState } from "react";
import dynamic from "next/dynamic";
import TextEditor from "./TextEditor";

const TabBar = dynamic(() => import("./TabBar"), {
  ssr: false,
});

const FlowEditor = dynamic(() => import("./ReactFlow/FlowEditor"), {
  ssr: false,
});

import classes from "./Workspace.module.scss";

const Workspace = (props) => {
  const [activeTab, setActiveTab] = useState("flow");

  const changeTabHandler = (option) => {
    setActiveTab(option);
  };

  console.log(activeTab);

  return (
    <div className={classes.workspace}>
      <FlowEditor show={activeTab === "flow"} />
      <TextEditor show={activeTab === "text"} />
      <TabBar
        stacked={props.stacked}
        active={activeTab}
        onChange={changeTabHandler}
      />
    </div>
  );
};

export default Workspace;
