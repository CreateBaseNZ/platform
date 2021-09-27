import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import useSound from "use-sound";
import html2canvas from "html2canvas";
import { MiniHoverContextProvider } from "../../store/mini-hover-context";
import { ReactFlowProvider } from "react-flow-renderer";
import HistoryItem from "./HistoryItem";
import { comparisonBoostLvl1Item, comparisonBoostLvl2Item, comparisonBoostLvl3Item, ifBoostLvl1Item, ifBoostLvl2Item, ifBoostLvl3Item, whileBoostLvl1Item } from "../../utils/boostQs";

import classes from "./Boost.module.scss";
import LevelModal from "./LevelModal";

const FlowEditor = dynamic(() => import("../ReactFlow/FlowEditor"), {
	ssr: false,
});

const getColour = (mode) => {
	switch (mode) {
		case "Comparison":
			return "#fe757e";
		case "If":
			return "#ff6bcd";
		case "While":
			return "#ff6bcd";
		default:
			throw "No colour theme defined for this Boost mode";
	}
};

const Boost = ({ mode, setLoaded, loadLevel = 0 }) => {
	const router = useRouter();
	const histWrapperRef = useRef();
	const histEndRef = useRef();
	const flowVisualBellTimer = useRef(null);
	const [elements, setElements] = useState([]);
	const [activeQ, setActiveQ] = useState({ q: "", o: [], a: "" });
	const [flowVisualBell, setFlowVisualBell] = useState({ message: "", switch: false });
	const [flash, setFlash] = useState("");
	const [level, setLevel] = useState(loadLevel);
	const [history, setHistory] = useState({
		list: [],
		expanded: false,
		locked: false,
	});
	const [showModal, setShowModal] = useState(false);
	const [volume, setVolume] = useState({ curr: 0.35, prev: 0.35 });
	const [boostColor] = useState(getColour(mode));
	const [playDonk] = useSound("/sounds/donk.mp3", { volume: volume.curr });
	const [playFlick] = useSound("/sounds/flick.mp3", { volume: volume.curr });
	const [playSynth, { stop: stopSynth }] = useSound("/sounds/synth.mp3", {
		volume: volume.curr,
	});
	const [playCorrect] = useSound("/sounds/correct.mp3", {
		volume: volume.curr,
	});
	const [playSkip] = useSound("/sounds/skip.mp3", {
		volume: volume.curr,
	});
	const [playInCorrect] = useSound("/sounds/incorrect.mp3", {
		volume: volume.curr,
	});

	useEffect(() => setLoaded(true), []);

	useEffect(() => {
		if (flowVisualBell.message) {
			clearTimeout(flowVisualBellTimer.current);
			flowVisualBellTimer.current = setTimeout(() => setFlowVisualBell((state) => ({ message: "", switch: state.switch })), [5000]);
		}
	}, [flowVisualBell.switch]);

	useEffect(() => {
		generateItem(mode, level);
		histEndRef.current?.scrollIntoView({
			behavior: "smooth",
			block: "nearest",
			inline: "start",
		});
		setFlash(null);
	}, [history.list, level]);

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
		let fc;
		if (mode === "Comparison") {
			if (level === 0) {
				fc = comparisonBoostLvl1Item;
			} else if (level === 1) {
				fc = comparisonBoostLvl2Item;
			} else if (level === 2) {
				fc = comparisonBoostLvl3Item;
			}
		} else if (mode === "If") {
			if (level === 0) {
				fc = ifBoostLvl1Item;
			} else if (level === 1) {
				fc = ifBoostLvl2Item;
			} else if (level === 2) {
				fc = ifBoostLvl3Item;
			}
		} else if (mode === "While") {
			fc = whileBoostLvl1Item;
		}
		const { q, els, o, a } = fc();
		setElements(els);
		setActiveQ({ q: q, o: o, a: a });
	};

	const choiceClickHandler = (response, event) => {
		stopSynth();
		const feedback = response.toString() === "skip" ? "skip" : activeQ.a.toString() === response.toString() ? "correct" : "incorrect";

		if (feedback === "correct") {
			setFlash("correct");
			playCorrect();
		} else if (feedback === "skip") {
			setFlash("skip");
			playSkip();
		} else {
			setFlash("incorrect");
			playInCorrect();
			event.target.classList.add(classes.incorrectResponse);
		}

		setTimeout(() => {
			html2canvas(document.querySelector(".react-flow__renderer")).then((canvas) => {
				event.target.classList.remove(classes.incorrectResponse);
				setHistory((state) => ({
					...state,
					list: state.list.concat({
						feedback: feedback,
						capture: canvas.toDataURL(),
						a: activeQ.a,
						r: response,
					}),
				}));
			});
		}, 2000);
	};

	const levelsClickHandler = () => {
		playFlick();
		setShowModal(true);
	};

	const renderVolumeIcon = () => {
		if (volume.curr === 0) {
			return (
				<span className="material-icons-outlined" style={{ color: "#fa6f6f" }}>
					volume_off
				</span>
			);
		}
		if (volume.curr < 0.5) {
			return <span className="material-icons-outlined">volume_down</span>;
		}
		return <span className="material-icons-outlined">volume_up</span>;
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
		<div className={`${classes.boost} ${classes[mode.toLowerCase()]}`}>
			<Head>
				<title>{mode} Boost | CreateBase</title>
				<meta name="description" content={""} />
			</Head>
			<h1 className={classes.h1}>
				<span className={classes.fill}>{mode}</span>
				<span className={classes.stroke}>Boost</span>
			</h1>
			<aside className={`${classes.leftMenu} ${history.expanded || history.locked ? classes.histExpanded : ""}`}>
				<div className={classes.histWrapper} ref={histWrapperRef}>
					{history.list.map((item, i) => (
						<HistoryItem key={i} item={item} index={i} expand={history.expanded || history.locked} />
					))}
					<div ref={histEndRef} />
					{history.list.length > 0 && <div className={classes.hoverArea} onMouseEnter={histMouseEnterHandler} onMouseLeave={histMouseLeaveHandler} onWheel={wheelHandler} />}
				</div>
				<div className={classes.buttonContainer} style={{ order: -1 }}>
					<button className={`${classes.button} ${classes.back}`} onMouseEnter={playDonk} onClick={() => router.back()}>
						<span className="material-icons-outlined">chevron_left</span> Back
					</button>
					<button className={`${classes.button} ${classes.levels}`} onClick={levelsClickHandler} onMouseEnter={playDonk}>
						<span className="material-icons-outlined">apps</span> Levels
					</button>
				</div>
				<div className={classes.buttonContainer}>
					<button className={`${classes.button} ${classes.lockHist} ${history.locked ? classes.histExpanded : ""}`} onClick={histLockClickHandler} onMouseEnter={playDonk}>
						{history.locked ? <span className="material-icons-outlined">check_box</span> : <span className="material-icons-outlined">check_box_outline_blank</span>}
						{history.locked ? "Collapse" : "Expand"}
					</button>
					<button className={`${classes.button} ${classes.volume}`} onMouseEnter={playDonk}>
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
									background: `linear-gradient(to right, ${boostColor} 0%, ${boostColor} ${volume.curr * 100}%, rgba(255,255,255,0.5) ${volume.curr * 100}%, rgba(255,255,255,0.5) 100%)`,
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
								flowVisualBell={flowVisualBell}
								setFlowVisualBell={setFlowVisualBell}
								query={`${mode.toLowerCase()}-boost`}
							/>
						</ReactFlowProvider>
					</MiniHoverContextProvider>
				</div>
				<div
					className={`${classes.questionWrapper} ${flash === "correct" ? classes.correctChoice : ""} ${flash === "incorrect" ? classes.incorrectChoice : ""} ${
						flash === "skip" ? classes.skippedChoice : ""
					} ${flash ? classes.flashing : ""} `}>
					<h3 className={classes.question}>
						{history.list.length + 1}: {activeQ.q}
					</h3>
					<div className={classes.choiceContainer}>
						{activeQ.o.map((choice, i) => (
							<button key={i} onClick={choiceClickHandler.bind(this, choice)} onMouseEnter={playSynth} className={`${classes.choice} ${choice === activeQ.a ? classes.answer : classes.notAnswer}`}>
								<p datachoice={choice} />
							</button>
						))}
					</div>
				</div>
			</div>
			{showModal && (
				<LevelModal currLvl={level} currMode={mode.toLowerCase()} playFlick={playFlick} playDonk={playDonk} playSynth={playSynth} setLevel={setLevel} closeHandler={() => setShowModal(false)} />
			)}
		</div>
	);
};

export default Boost;
