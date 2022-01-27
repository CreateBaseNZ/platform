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
			await post("/api/profile/read-saves", { profileId: globalSession.profileId, properties: [id] }, (saves) => router.replace(`/project/${id}/${saves.content[id]?.step || "define"}`));
		})();
	}, [router, globalSession.loaded, globalSession.profileId, post]);

	return null;
};

export default ProjectRoot;
