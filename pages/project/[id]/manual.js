import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import router, { useRouter } from "next/router";
import useUnity from "../../../hooks/useUnity";
import Unity from "../../../components/Game/Unity";
import LoadingScreen from "../../../components/UI/LoadingScreen";
import getProjectData from "../../../utils/getProjectData";

import classes from "../../../styles/manual.module.scss";
import useMixpanel from "../../../hooks/useMixpanel";
import GlobalSessionContext from "../../../store/global-session-context";

const UnityWrapper = ({ data, setLoaded }) => {
	const [unityContext, sensorData, gameState, resetScene] = useUnity({
		project: data.query,
		scenePrefix: data.scenePrefix,
		mode: "manual",
		index: data.subsystems.length - 1,
		wip: data.wip,
		setLoaded: setLoaded,
	});
	const { globalSession } = useContext(GlobalSessionContext);
	const mp = useMixpanel();

	useEffect(() => {
		mp.init();
	}, []);

	useEffect(() => {
		if (gameState === "Win") {
			mp.track("game_manual_progress", {
				state: "win",
				licenses: globalSession.groups.map((group) => group.licenseId),
				schools: globalSession.groups.map((group) => group.id),
				project: router.query.id,
				subsystem: router.query.subsystem,
			});
		}
	}, [gameState]);

	return <Unity unityContext={unityContext} />;
};

const Play = () => {
	const router = useRouter();
	const [data, setData] = useState();
	const [gameLoaded, setGameLoaded] = useState(false);

	useEffect(() => {
		if (router.query.id) {
			setData(getProjectData(router.query.id));
		}
	}, [router.query.id]);

	console.log(data);
	console.log(gameLoaded);

	if (!data) return <LoadingScreen />;

	return (
		<div className={classes.manual}>
			<Head>
				<title>Play {data.name} | CreateBase</title>
				<meta name="description" content="CreateBase" />
			</Head>
			<Link href={{ pathname: "/project/[id]/imagine", query: router.query }}>
				<a className={classes.backButton} title="Back to Imagine">
					<span className="material-icons-outlined">exit_to_app</span>
				</a>
			</Link>
			<UnityWrapper data={data} setLoaded={setGameLoaded} />
			{!gameLoaded && <LoadingScreen />}
		</div>
	);
};

Play.auth = "user";

export default Play;
