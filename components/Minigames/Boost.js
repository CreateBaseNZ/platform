import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import html2canvas from "html2canvas";
import { MiniHoverContextProvider } from "../../store/mini-hover-context";
import { ReactFlowProvider } from "react-flow-renderer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

import { comparisonBoostQs } from "../../utils/boostQs";

import classes from "./Boost.module.scss";

const FlowEditor = dynamic(() => import("../ReactFlow/FlowEditor"), {
  ssr: false,
});

const getQs = (mode) => {
  switch (mode) {
    case "Comparison":
      return comparisonBoostQs;
  }
};

const Boost = ({ mode, query }) => {
  const visualBellTimer = useRef(null);
  const [elements, setElements] = useState([
    {
      id: "start",
      type: "start",
      position: { x: -80, y: -80 },
      data: { connections: [] },
    },
  ]);
  const [visualBell, setVisualBell] = useState({ message: "", switch: false });
  const [qs, setQs] = useState(getQs(mode));
  const [qIndex, setQIndex] = useState(0);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

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
    html2canvas(document.querySelector(".react-flow__renderer")).then(
      (canvas) => {
        if (qs[qIndex].a === i) {
          setHistory((hist) =>
            hist.concat({ correct: true, capture: canvas.toDataURL() })
          );
        } else {
          setHistory((hist) =>
            hist.concat({ correct: false, capture: canvas.toDataURL() })
          );
        }
      }
    );
    setQIndex((state) => state + 1);
  };

  const historyClickHandler = () => {
    setShowHistory((state) => !state);
  };

  return (
    <div className={classes.boost}>
      <Head>
        <title>{mode} Boost | CreateBase</title>
        <meta name="description" content={""} />
      </Head>

      <h1 className={classes.h1}>
        <span className={classes.fill}>{mode}</span>
        <span className={classes.stroke}>Boost</span>
      </h1>
      <aside className={classes.histContainer}>
        <Link
          href={{
            pathname: `/${query}/project/[step]`,
            query: { step: "research" },
          }}
        >
          <button className={`${classes.button} ${classes.back}`}>
            <ChevronLeftIcon /> Back
          </button>
        </Link>
        <div
          className={`${classes.histWrapper} ${
            showHistory ? "" : classes.collapsed
          }`}
          style={{ opacity: history.length ? 1 : 0 }}
        >
          {history.map((hist, i) => (
            <div className={classes.histItem} key={i}>
              <div className={classes.histImg}>
                <Image
                  src={hist.capture}
                  quality={100}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div
                className={`${classes.histIndex} ${
                  hist.correct ? classes.correct : classes.incorrect
                }`}
              >
                {i + 1}
              </div>
            </div>
          ))}
        </div>
        <button
          className={`${classes.button} ${classes.history} ${
            showHistory ? classes.active : ""
          }`}
          onClick={historyClickHandler}
        >
          {showHistory ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
          {showHistory ? "Lock history" : "Unlock history"}
        </button>
      </aside>
      <div className={classes.game}>
        <div className={classes.flowWrapper}>
          <MiniHoverContextProvider>
            <ReactFlowProvider>
              <FlowEditor
                show={true}
                showDnd={true}
                elements={elements}
                setElements={setElements}
                visualBell={visualBell}
                setVisualBell={setVisualBell}
                query={`${mode.toLowerCase()}-boost`}
              />
            </ReactFlowProvider>
          </MiniHoverContextProvider>
        </div>
        <div className={classes.questionWrapper}>
          <h3 className={classes.question}>
            {qIndex + 1}: {qs[qIndex].q}
          </h3>
          <div className={classes.choiceContainer}>
            {qs[qIndex].choices.map((choice, i) => (
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
      </div>
    </div>
  );
};

export default Boost;
