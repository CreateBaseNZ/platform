import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import useSound from "use-sound";
import html2canvas from "html2canvas";
import { MiniHoverContextProvider } from "../../store/mini-hover-context";
import { ReactFlowProvider } from "react-flow-renderer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import AppsOutlinedIcon from "@material-ui/icons/AppsOutlined";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import HistoryItem from "./HistoryItem";
import VolumeUpOutlinedIcon from "@material-ui/icons/VolumeUpOutlined";
import VolumeDownOutlinedIcon from "@material-ui/icons/VolumeDownOutlined";
import VolumeOffOutlinedIcon from "@material-ui/icons/VolumeOffOutlined";
import { comparisonBoostLvl1Item } from "../../utils/boostQs";

import classes from "./Boost.module.scss";

const FlowEditor = dynamic(() => import("../ReactFlow/FlowEditor"), {
  ssr: false,
});

const Boost = ({ mode, setLoaded }) => {
  const router = useRouter();
  const histWrapperRef = useRef();
  const histEndRef = useRef();
  const visualBellTimer = useRef(null);
  const [elements, setElements] = useState([]);
  const [activeQ, setActiveQ] = useState({ q: "", o: [], a: "" });
  const [visualBell, setVisualBell] = useState({ message: "", switch: false });
  const [flash, setFlash] = useState("");
  const [level, setLevel] = useState(1);
  const [history, setHistory] = useState({
    list: [],
    expanded: false,
    locked: false,
  });
  const [volume, setVolume] = useState({ curr: 0.5, prev: 0.5 });
  const [playDonk] = useSound("/sounds/donk.mp3", { volume: volume.curr });
  const [playFlick] = useSound("/sounds/flick.mp3", { volume: volume.curr });
  const [playSynth, { stop: stopSynth }] = useSound("/sounds/synth.mp3", {
    volume: volume.curr,
  });
  const [playCorrect] = useSound("/sounds/correct.mp3", {
    volume: volume.curr,
  });
  const [playInCorrect] = useSound("/sounds/incorrect.mp3", {
    volume: volume.curr,
  });

  useEffect(() => setLoaded(true), []);

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
  }, [history.list]);

  useEffect(() => {
    const scroll = () =>
      histEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    if (history.expanded || history.locked) {
      setTimeout(scroll, [210]);
    } else {
      scroll();
    }
  }, [history.expanded, history.locked]);

  const generateItem = (mode, level) => {
    if (mode === "Comparison") {
      if (level === 1) {
        const { q, els, o, a } = comparisonBoostLvl1Item();
        setElements(els);
        setActiveQ({ q: q, o: o, a: a });
      }
    }
  };

  const choiceClickHandler = (response, event) => {
    stopSynth();
    const correct = activeQ.a.toString() === response.toString();

    if (correct) {
      setFlash("correct");
      playCorrect();
    } else {
      setFlash("incorrect");
      playInCorrect();
      event.target.classList.add(classes.incorrectResponse);
    }

    setTimeout(() => {
      setFlash(null);
      html2canvas(document.querySelector(".react-flow__renderer")).then(
        (canvas) => {
          event.target.classList.remove(classes.incorrectResponse);
          setHistory((state) => ({
            ...state,
            list: state.list.concat({
              correct: correct,
              capture: canvas.toDataURL(),
              a: activeQ.a,
              r: response,
            }),
          }));
        }
      );
    }, 2000);
  };

  const renderVolumeIcon = () => {
    if (volume.curr === 0) {
      return <VolumeOffOutlinedIcon style={{ color: "#fa6f6f" }} />;
    }
    if (volume.curr < 0.5) {
      return <VolumeDownOutlinedIcon />;
    }
    return <VolumeUpOutlinedIcon />;
  };

  const volumeClickHandler = () => {
    if (volume.curr) {
      setVolume((state) => ({ curr: 0, prev: state.curr }));
    } else {
      setVolume((state) => ({ curr: state.prev, prev: state.prev }));
    }
  };

  const volumeChangeHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setVolume((state) => ({
      curr: parseFloat(e.target.value),
      prev: state.curr,
    }));
  };

  const histLockClickHandler = () => {
    playFlick();
    setHistory((state) => ({ ...state, locked: !state.locked }));
  };

  const histMouseEnterHandler = () => {
    setHistory((state) => ({ ...state, expanded: true }));
  };

  const histMouseLeaveHandler = () => {
    setHistory((state) => ({ ...state, expanded: false }));
  };

  const wheelHandler = (e) => {
    histWrapperRef.current.scrollTop += e.deltaY;
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
      <aside
        className={`${classes.leftMenu} ${
          history.expanded || history.locked ? classes.histExpanded : ""
        }`}
      >
        <div className={classes.histWrapper} ref={histWrapperRef}>
          {history.list.map((item, i) => (
            <HistoryItem
              key={i}
              item={item}
              index={i}
              expand={history.expanded || history.locked}
            />
          ))}
          <div ref={histEndRef} />
          {history.list.length > 0 && (
            <div
              className={classes.hoverArea}
              onMouseEnter={histMouseEnterHandler}
              onMouseLeave={histMouseLeaveHandler}
              onWheel={wheelHandler}
            />
          )}
        </div>
        <div className={classes.buttonContainer} style={{ order: -1 }}>
          <button
            className={`${classes.button} ${classes.back}`}
            onMouseEnter={playDonk}
            onClick={() => router.back()}
          >
            <ChevronLeftIcon /> Back
          </button>
          <button className={classes.button} onMouseEnter={playDonk}>
            <AppsOutlinedIcon /> Levels
          </button>
        </div>
        <div className={classes.buttonContainer}>
          <button
            className={`${classes.button} ${classes.lockHist} ${
              history.locked ? classes.histExpanded : ""
            }`}
            onClick={histLockClickHandler}
            onMouseEnter={playDonk}
          >
            {history.locked ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
            {history.locked ? "Collapse" : "Expand"}
          </button>
          <button
            className={`${classes.button} ${classes.volume}`}
            onMouseEnter={playDonk}
          >
            <div className={classes.sliderWrapper}>
              <input
                type="range"
                min="0"
                step="0.01"
                max="1"
                value={volume.curr}
                className={classes.slider}
                onChange={volumeChangeHandler}
                style={{
                  background: `linear-gradient(to right, #ec505b 0%, #ec505b ${
                    volume.curr * 100
                  }%, rgba(255,255,255,0.5) ${
                    volume.curr * 100
                  }%, rgba(255,255,255,0.5) 100%)`,
                }}
              />
            </div>
            <div className={classes.volumeIcon} onClick={volumeClickHandler}>
              {renderVolumeIcon()}
            </div>
          </button>
        </div>
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
            {history.list.length + 1}: {activeQ.q}
          </h3>
          <div className={classes.choiceContainer}>
            {activeQ.o.map((choice, i) => (
              <button
                key={i}
                onClick={choiceClickHandler.bind(this, choice)}
                onMouseEnter={playSynth}
                className={`${classes.choice} ${
                  choice === activeQ.a ? classes.answer : classes.notAnswer
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
