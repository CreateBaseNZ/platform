import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import useMixpanel from "../../../hooks/useMixpanel";
import GlobalSessionContext from "../../../store/global-session-context";
import Game from "../../../components/Game/Game";
import getProjectData from "../../../utils/getProjectData";
import LoadingScreen from "../../../components/UI/LoadingScreen";

const SubsystemGame = () => {
	const router = useRouter();
	const [data, setData] = useState();
	const [subsystemIndex, setSubsystemIndex] = useState();
	const mp = useMixpanel();
	const { globalSession } = useContext(GlobalSessionContext);

	useEffect(() => {
		mp.init();
		const clearSession = mp.trackActiveSession("code_create_time", {
			licenses: globalSession.groups.map((group) => group.licenseId),
			schools: globalSession.groups.map((group) => group.id),
			project: router.query.id,
			subsystem: router.query.subsystem,
		});
		mp.track("");
		return () => {
			clearSession();
		};
	}, []);

	useEffect(() => {
		if (router.isReady) {
			if (router.query.id) {
				const _data = getProjectData(router.query.id);
				setData(_data);
				setSubsystemIndex(_data.subsystems.findIndex((subsystem) => subsystem.title === router.query.subsystem));
			}
		}
	}, [router.isReady, router.query.id]);

	if (!data || subsystemIndex === null) return <LoadingScreen />;

	return (
		<>
			<Head>
				<title>
					{data.subsystems[subsystemIndex].title} • {data.name} | CreateBase
				</title>
				<meta name="description" content="CreateBase" />
			</Head>
			<Game project={data} index={subsystemIndex} query={data.query} blockList={data.subsystems[subsystemIndex].blockList} />
		</>
	);
};

export default SubsystemGame;
