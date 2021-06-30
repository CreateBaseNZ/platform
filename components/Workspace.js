import { useState } from "react";
import TabBar from "./TabBar";

import classes from "./Workspace.module.scss";

const Workspace = (props) => {
  const [activeTab, setActiveTab] = useState("flow");

  const changeTabHandler = (option) => {
    setActiveTab(option);
  };

  return (
    <div className={classes.workspace}>
      <div style={{ height: "100%", width: "100%" }}></div>
      <TabBar
        stacked={props.stacked}
        active={activeTab}
        onChange={changeTabHandler}
      />
    </div>
  );
};

export default Workspace;
