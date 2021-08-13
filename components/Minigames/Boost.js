import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Head from "next/head";
import dynamic from "next/dynamic";
import html2canvas from "html2canvas";
import { MiniHoverContextProvider } from "../../store/mini-hover-context";
import { ReactFlowProvider } from "react-flow-renderer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

import { comparisonBoostLvl1Item } from "../../utils/boostQs";

import classes from "./Boost.module.scss";
import HistoryItem from "./HistoryItem";

const FlowEditor = dynamic(() => import("../ReactFlow/FlowEditor"), {
  ssr: false,
});

const Boost = ({ mode, query }) => {
  const histEndRef = useRef();
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
    histEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
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

  const choiceClickHandler = (response, event) => {
    const correct = answer.toString() === response.toString();

    if (correct) {
      setFlash("correct");
    } else {
      setFlash("incorrect");
      event.target.classList.add(classes.incorrectResponse);
    }

    setTimeout(() => {
      setFlash(null);
      html2canvas(document.querySelector(".react-flow__renderer")).then(
        (canvas) => {
          event.target.classList.remove(classes.incorrectResponse);
          setHistory((hist) =>
            hist.concat({
              correct: correct,
              capture: canvas.toDataURL(),
              a: answer,
              r: response,
            })
          );
        }
      );
    }, 2000);
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
          {history.map((item, i) => (
            <HistoryItem key={i} item={item} index={i} />
          ))}
          <div ref={histEndRef} />
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
        <div
          className={`${classes.questionWrapper} ${
            flash === "correct" ? classes.correctChoice : ""
          } ${flash === "incorrect" ? classes.incorrectChoice : ""} ${
            flash ? classes.flashing : ""
          } `}
        >
          <h3 className={classes.question}>
            {history.length + 1}: What does this print?
          </h3>
          <div className={classes.choiceContainer}>
            {options.map((choice, i) => (
              <button
                key={i}
                onClick={choiceClickHandler.bind(this, choice)}
                className={`${classes.choice} ${
                  choice === answer ? classes.answer : classes.notAnswer
                }`}
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
