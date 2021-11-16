import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Game from "../../../components/Game/Game";
import getProjectData from "../../../utils/getProjectData";

// TODO re integrate loading screen
const setLoaded = () => {};

const SubsystemGame = () => {
	const router = useRouter();
	const [data, setData] = useState();
	const [subsystemIndex, setSubsystemIndex] = useState();

	useEffect(() => {
		return () => setLoaded(false);
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

	if (!data || (subsystemIndex ?? null === null)) return null;

	return <Game setLoaded={setLoaded} project={data} index={subsystemIndex} query={data.query} blockList={data.subsystems[subsystemIndex].blockList} />;
};

export default SubsystemGame;
