import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { MiniHoverContextProvider } from "../../store/mini-hover-context";
import { ReactFlowProvider } from "react-flow-renderer";

import classes from "./Boost.module.scss";

const FlowEditor = dynamic(() => import("../ReactFlow/FlowEditor"), {
  ssr: false,
});

const Boost = ({ mode }) => {
  const visualBellTimer = useRef(null);
  const [elements, setElements] = useState([]);
  const [visualBell, setVisualBell] = useState({ message: "", switch: false });

  useEffect(() => {
    if (visualBell.message) {
      clearTimeout(visualBellTimer.current);
      visualBellTimer.current = setTimeout(
        () => setVisualBell((state) => ({ message: "", switch: state.switch })),
        [5000]
      );
    }
  }, [visualBell.switch]);

  return (
    <div className={classes.boost}>
      <div className={classes.flowWrapper}>
        <MiniHoverContextProvider>
          <ReactFlowProvider>
            <FlowEditor
              show={true}
              elements={elements}
              setElements={setElements}
              visualBell={visualBell}
              setVisualBell={setVisualBell}
              query={mode}
            />
          </ReactFlowProvider>
        </MiniHoverContextProvider>
      </div>
      <div className={classes.questionWrapper}>
        <h1 className={classes.question}>What will be printed?</h1>
        <div className={classes.choiceContainer}>
          <button className={classes.choice}>1</button>
          <button className={classes.choice}>1</button>
          <button className={classes.choice}>1</button>
          <button className={classes.choice}>1</button>
        </div>
      </div>
    </div>
  );
};

export default Boost;
