import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Game from "../../../components/Game/Game";
import getProjectData from "../../../utils/getProjectData";

// TODO re integrate loading screen
const setLoaded = () => {};

const ImproveGame = () => {
	const router = useRouter();
	const [data, setData] = useState();

	useEffect(() => {
		return () => setLoaded(false);
	}, []);

	useEffect(() => {
		if (router.isReady) {
			if (router.query.id) {
				setData(getProjectData(router.query.id));
			}
		}
	}, [router.isReady, router.query.id]);

	if (!data) return null;

	return <Game setLoaded={setLoaded} mode="improve" project={data} index={data.subsystems.length} query={data.query} blockList={data.improve.blockList} />;
};

export default ImproveGame;
