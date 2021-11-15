import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useUnity from "../../../hooks/useUnity";
import Unity from "../../../components/Game/Unity";
import getProjectData from "../../../utils/getProjectData";

import classes from "/styles/manual.module.scss";

// TODO re integrate loading screen
const setLoaded = () => {};

const UnityWrapper = ({ data }) => {
	const [unityContext, sensorData, gameState, resetScene] = useUnity({
		project: data.query,
		scenePrefix: data.scenePrefix,
		scene: "manual",
		iteration: data.subsystems.length,
		setLoaded: setLoaded,
	});

	return <Unity unityContext={unityContext} />;
};

const Play = () => {
	const router = useRouter();
	const [data, setData] = useState();

	useEffect(() => {
		return () => setLoaded(false);
	}, []);

	useEffect(() => {
		if (router.query.id) {
			setData(getProjectData(router.query.id));
		}
	}, [router.query.id]);

	if (!data) return null;

	return (
		<div className={classes.play}>
			<Link href={{ pathname: "/project/[id]/imagine", query: router.query }}>
				<a className={classes.backButton} title="Back to Imagine">
					<span className="material-icons-outlined">exit_to_app</span>
				</a>
			</Link>
			<UnityWrapper data={data} />
		</div>
	);
};

Play.auth = "user";

export default Play;
