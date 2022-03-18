import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import Game from "../components/Game/Game.js";
import { useContext, useEffect, useState } from "react";
import { ALL_PROJECTS_ARRAY } from "../utils/getProjectData";
import LoadingScreen from "../components/UI/LoadingScreen";
// import { PrimaryButton } from "../components/UI/Buttons";
// import Img from "../components/UI/Img";
import router from "next/router";
// import useApi from "../hooks/useApi";
import classes from "../styles/weeklyChallenge.module.scss";

const DATA = ALL_PROJECTS_ARRAY[0]
const SUBSYSTEM_INDEX = 0

const WeeklyChallenge = () => {
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
						<div className={classes.img}>{/* <Image src="https://raw.githubusercontent.com/CreateBaseNZ/public/dev/404.png" layout="fill" objectFit="contain" alt="logo" /> */}</div>
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

				<div className={classes.game}>
					{/* Modal */}
					<></>
					{/* Unity component */}
					<Game project={DATA} index={SUBSYSTEM_INDEX} query={DATA.query} blockList={DATA.subsystems[SUBSYSTEM_INDEX].blockList} />
				</div>
			</div>
		</div>
	);
};

export default WeeklyChallenge;

WeeklyChallenge.auth = "any";
