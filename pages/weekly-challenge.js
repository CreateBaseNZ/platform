import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import Game from "../components/Game/Game.js";
import { useContext, useEffect, useState } from "react";
import { ALL_PROJECTS_ARRAY } from "../utils/getProjectData";
import Leaderboard from "../components/WeeklyChallenge/Leaderboard";
import Complete from "../components/WeeklyChallenge/Complete";
import Share from "../components/WeeklyChallenge/Share";
import Subscribe from "../components/WeeklyChallenge/Subscribe";
import EducationalContent from "../components/WeeklyChallenge/EducationalContent";
import classes from "../styles/weeklyChallenge.module.scss";

const DATA = ALL_PROJECTS_ARRAY[0];
const SUBSYSTEM_INDEX = 0;

const WeeklyChallenge = () => {
	const [isModalActive, showModal] = useState(true);

	const winHandler = (unityContext) => {
		console.log("very nice");
		console.log(unityContext);
	};

	return (
		<div className={classes.view}>
			<Head>
				<title>Weekly Challenge</title>
				<meta name="description" content="New CreateBase weekly challenge! Compete against friends to code solutions for fun robotic systems." />
			</Head>
			<div className={classes.container}>
				<div className={classes.header}>
					<div className={classes.headerContainer}>
						<div className={classes.logoWrap}>
							<div className={classes.logoContainer}>
								<Image src="https://raw.githubusercontent.com/CreateBaseNZ/public/dev/icons/logo-no-text.svg" layout="fill" objectFit="contain" alt="logo" />
							</div>
							<h1>Weekly Challenge</h1>
						</div>
						<div className={classes.headerBtnContainer}>
							<button className={`${classes.subscribeBtn} ${classes.CTAbtn}`}>
								<p>Subscribe</p>
							</button>
							<button className={`${classes.shareBtn} ${classes.CTAbtn}`}>
								<p>Share</p>
							</button>
							<button className={`${classes.learnMoreBtn} ${classes.CTAbtn}`}>
								<p>Learn More</p>
							</button>
						</div>
						<div className={classes.hamburger}>
							<span className="material-icons-outlined">menu</span>
						</div>
					</div>
					<div className={classes.nav}>
						<div className={classes.navList}>
							<div className={classes.navBtnContainer}>
								<button className={classes.learningContentBtn}>
									<span className="material-icons-outlined">movie</span>
									<p>Define</p>
								</button>
							</div>
							<div className={classes.navBtnContainer}>
								<button className={classes.learningContentBtn}>
									<span className="material-icons-outlined">filter_drama</span>
									<p>Imagine</p>
								</button>
							</div>
							<div className={classes.navBtnContainer}>
								<button className={classes.learningContentBtn}>
									<span className="material-icons-outlined">biotech</span>
									<p>Research</p>
								</button>
							</div>
						</div>
						<div className={classes.spacer}></div>
						<button className={classes.leaderboardBtn}>
							<span className="material-icons-outlined">emoji_events</span>
							<p>Leaderboard</p>
						</button>
					</div>
				</div>

				<div className={classes.gameWrap}>
					{/* Modal */}
					{isModalActive && (
						<div className={classes.modalWrap}>
							<div className={classes.modalContainer}>
								<div className={classes.previousModal}>
									<button className={classes.previousBtn}>
										<span className="material-icons-outlined">navigate_before</span>
									</button>
								</div>
								<div className={classes.Modal}>
									{/* <Leaderboard/> */}
									{/* <Complete/> */}
									{/* <Share/> */}
									{/* <Subscribe/> */}
									<EducationalContent />
								</div>
								<div className={classes.nextModal}>
									<button className={classes.nextBtn}>
										<span className="material-icons-outlined">navigate_next</span>
									</button>
								</div>
							</div>
						</div>
					)}
					{/* Unity component */}
					<div className={classes.game}>
						<Game project={DATA} index={SUBSYSTEM_INDEX} query={DATA.query} blockList={DATA.subsystems[SUBSYSTEM_INDEX].blockList} winCallback={winHandler} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default WeeklyChallenge;

WeeklyChallenge.auth = "any";
