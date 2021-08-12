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

import { comparisonBoostLvl1Item } from "../../utils/boostQs";

import classes from "./Boost.module.scss";

const FlowEditor = dynamic(() => import("../ReactFlow/FlowEditor"), {
  ssr: false,
});

const Boost = ({ mode, query }) => {
  const visualBellTimer = useRef(null);
  const [elements, setElements] = useState([]);
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState("");
  const [visualBell, setVisualBell] = useState({ message: "", switch: false });
  const [flash, setFlash] = useState();
  const [level, setLevel] = useState(1);
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

  useEffect(() => {
    generateItem(mode, level);
  }, [history]);

  const generateItem = (mode, level) => {
    if (mode === "Comparison") {
      if (level === 1) {
        const { q, o, a } = comparisonBoostLvl1Item();
        setElements(q);
        setOptions(o);
        setAnswer(a);
      }
    }
  };

  const choiceClickHandler = (response) => {
    html2canvas(document.querySelector(".react-flow__renderer")).then(
      (canvas) => {
        setHistory((hist) =>
          hist.concat({
            correct: answer.toString() === response.toString(),
            capture: canvas.toDataURL(),
            a: answer,
            r: response,
          })
        );
      }
    );
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
              {hist.correct ? (
                <div className={classes.histRecord}>
                  <span className={classes.correctRecord}>{hist.a}</span>
                </div>
              ) : (
                <div className={classes.histRecord}>
                  <span className={classes.incorrectRecord}>{hist.r}</span>→
                  <span className={classes.correctRecord}>{hist.a}</span>
                </div>
              )}
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
          {showHistory ? "Unlock history" : "Lock history"}
        </button>
      </aside>
      <div className={classes.game}>
        <div className={classes.flowWrapper}>
          <MiniHoverContextProvider>
            <ReactFlowProvider>
              <FlowEditor
                show={true}
                frozen={true}
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
            {history.length + 1}: What does this print?
          </h3>
          <div className={classes.choiceContainer}>
            {options.map((choice, i) => (
              <button
                key={i}
                onClick={choiceClickHandler.bind(this, choice)}
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
