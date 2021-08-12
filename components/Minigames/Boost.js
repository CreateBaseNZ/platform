import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { MiniHoverContextProvider } from "../../store/mini-hover-context";
import { ReactFlowProvider } from "react-flow-renderer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ClearAllOutlinedIcon from "@material-ui/icons/ClearAllOutlined";

import classes from "./Boost.module.scss";

const FlowEditor = dynamic(() => import("../ReactFlow/FlowEditor"), {
  ssr: false,
});

const choices = [1, 2, 3, 4];

const Boost = ({ mode, query }) => {
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

  const choiceClickHandler = (i) => {
    console.log(i);
  };

  return (
    <div className={classes.boost}>
      <Link
        href={{
          pathname: `/${query}/project/[step]`,
          query: { step: "research" },
        }}
      >
        <button className={`${classes.button} ${classes.back}`}>
          <ChevronLeftIcon />
          <span>Back</span>
        </button>
      </Link>
      <h1 className={classes.h1}>
        <span className={classes.fill}>Comparison</span>
        <span className={classes.stroke}>Boost</span>
      </h1>
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
        <h3 className={classes.question}>What will be printed?</h3>
        <div className={classes.choiceContainer}>
          {choices.map((choice, i) => (
            <button
              key={i}
              onClick={choiceClickHandler.bind(this, i)}
              className={classes.choice}
            >
              <p>{choice}</p>
            </button>
          ))}
        </div>
      </div>
      <button className={`${classes.button} ${classes.history}`}>
        <ClearAllOutlinedIcon />
        <span>History</span>
      </button>
    </div>
  );
};

export default Boost;
