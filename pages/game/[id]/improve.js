import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import useMixpanel from "../../../hooks/useMixpanel";
import GlobalSessionContext from "../../../store/global-session-context";
import Game from "../../../components/Game/Game";
import getProjectData from "../../../utils/getProjectData";
import LoadingScreen from "../../../components/UI/LoadingScreen";

const ImproveGame = () => {
	const router = useRouter();
	const [data, setData] = useState();
	const mp = useMixpanel();
	const { globalSession } = useContext(GlobalSessionContext);

	useEffect(() => {
		mp.init();
		const clearSession = mp.trackActiveSession("code_improve_time");
		return () => {
			clearSession();
		};
	}, []);

	useEffect(() => {
		if (router.isReady) {
			if (router.query.id) {
				setData(getProjectData(router.query.id));
			}
		}
	}, [router.isReady, router.query.id]);

	if (!data) return <LoadingScreen />;

	return (
		<>
			<Head>
				<title>Improve • {data.name} | CreateBase</title>
				<meta name="description" content="CreateBase" />
			</Head>
			<Game isImprove={true} project={data} index={data.subsystems.length - 1} query={data.query} blockList={data.improve.blockList} />
		</>
	);
};

export default ImproveGame;

ImproveGame.auth = "user";
