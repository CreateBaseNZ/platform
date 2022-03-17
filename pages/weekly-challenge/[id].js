import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import Game from "../../components/Game/Game.js";
import { useContext, useEffect, useState } from "react";
import { ALL_PROJECTS_ARRAY } from "../../utils/getProjectData";
import LoadingScreen from "../../components/UI/LoadingScreen";
// import { PrimaryButton } from "../components/UI/Buttons";
// import Img from "../components/UI/Img";
import router from "next/router";
// import useApi from "../hooks/useApi";

import classes from "../styles/weeklyChallenge.module.scss";

const WeeklyChallenge = () => {
	const router = useRouter();
	const [data, setData] = useState();
	const [subsystemIndex, setSubsystemIndex] = useState(null);

	useEffect(() => {
		if (router.isReady) {
			const _data = ALL_PROJECTS_ARRAY.find((project) => {project.subsystems.indexOf(sub => sub.title === router.query.id)});
			if (!_data) return void router.replace("/404");

			const _subsystemIndex = _data.subsystems.findIndex((subsystem) => subsystem.title === router.query.subsystem);
			if (_subsystemIndex < 0) return void router.replace("/404");

			setData(_data);
			setSubsystemIndex(_subsystemIndex);
		}
	}, [router.isReady, router.query.id]);

	if (!data || subsystemIndex === null) return <LoadingScreen />;

	return (
		<div className={classes.view}>
			<Head>
				<title>Weekly Challenge</title>
				<meta name="description" content="New CreateBase weekly challenge! Compete against friends to code solutions for fun robotic systems." />
			</Head>
			<div className={classes.container}>
				<div className={classes.header}>
                    <div className={classes.logoWrap}>
						<div className={classes.logoContainer}>
							<Image src="https://raw.githubusercontent.com/CreateBaseNZ/public/dev/icons/logo-no-text.svg" layout="fill" objectFit="contain" alt="logo" />
						</div>
						<h1>Weekly Challenge</h1>
					</div>
					<div className={classes.img}>
						{/* <Image src="https://raw.githubusercontent.com/CreateBaseNZ/public/dev/404.png" layout="fill" objectFit="contain" alt="logo" /> */}
					</div>
					<div className={classes.headerBtnContainer}>
						<button className={`${classes.subscribeBtn} ${classes.CTAbtn}`}><p>Subscribe</p></button>
						<button className={`${classes.shareBtn} ${classes.CTAbtn}`}><p>Share</p></button>
						<button className={`${classes.learnMoreBtn} ${classes.CTAbtn}`}><p>Learn More</p></button>
					</div>
				</div>
				<div className="unityInstanceWrap">
					{/* Unity component */}
					<Game project={data} index={subsystemIndex} query={data.query} blockList={data.subsystems[subsystemIndex].blockList} />
				</div>
				<div className="codeEditorWrap">
					{/* Unity component */}
				</div>
			</div>
		</div>
	);
};

export default WeeklyChallenge;
