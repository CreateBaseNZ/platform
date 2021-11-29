import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import useMixpanel from "../../../hooks/useMixpanel";
import GlobalSessionContext from "../../../store/global-session-context";
import Game from "../../../components/Game/Game";
import getProjectData from "../../../utils/getProjectData";

// TODO re integrate loading screen
const setLoaded = () => {};

const ImproveGame = () => {
	const router = useRouter();
	const [data, setData] = useState();
	const mp = useMixpanel();
	const { globalSession } = useContext(GlobalSessionContext);

	useEffect(() => {
		mp.init();
		const clearSession = mp.trackActiveSession("game_improve", {
			licenses: globalSession.groups.map((group) => group.licenseId),
			schools: globalSession.groups.map((group) => group.id),
			project: router.query.id,
		});
		return () => {
			clearSession();
			setLoaded(false);
		};
	}, []);

	useEffect(() => {
		if (router.isReady) {
			if (router.query.id) {
				setData(getProjectData(router.query.id));
			}
		}
	}, [router.isReady, router.query.id]);

	if (!data) return null;

	return (
		<>
			<Head>
				<title>Improve • {data.name} | CreateBase</title>
				<meta name="description" content="CreateBase" />
			</Head>
			<Game setLoaded={setLoaded} mode="improve" project={data} index={data.subsystems.length - 1} query={data.query} blockList={data.improve.blockList} />
		</>
	);
};

export default ImproveGame;
