import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import useApi from "../../../hooks/useApi";
import GlobalSessionContext from "../../../store/global-session-context";

const ProjectRoot = () => {
	const router = useRouter();
	const { globalSession } = useContext(GlobalSessionContext);
	const { post } = useApi();

	useEffect(() => {
		if (!router.isReady || !globalSession.loaded) return;
		const id = router.query.id as string;
		(async () => {
			await post("/api/profile/read-saves", { profileId: globalSession.profileId, properties: [id] }, (saves) => {
				console.log(saves);
				const subsystemStep = saves.content[id]?.subsystemStep;
				const subsystem = saves.content[id]?.subsystem;
				const step = saves.content[id]?.step;
				if (subsystemStep) {
					if (subsystem) {
						router.replace(`/project/${id}/${saves[id]?.subsystem}/${saves[id]?.subsystemStep}`);
					} else {
						router.replace(`/project/${id}/${saves[id]?.subsystem}/research`);
					}
				} else {
					if (step) {
						router.replace(`/project/${id}/${step}`);
					} else {
						router.replace(`/project/${id}/define`);
					}
				}
			});
		})();
	}, [router, globalSession]);

	return null;
};

export default ProjectRoot;
