import { useRouter } from "next/router";
import { ReactElement, useContext, useEffect } from "react";
import ProjectLayout from "../../../../../components/Layouts/ProjectLayout/ProjectLayout";
import { ALL_PROJECTS_ARRAY, ALL_PROJECTS_OBJECT } from "../../../../../constants/projects";
import useApi from "../../../../../hooks/useApi";
import GlobalSessionContext from "../../../../../store/global-session-context";
import { TProject } from "../../../../../types/projects";

interface Props {
	data: TProject;
	subsystem: string;
}

const Subsystem = ({ data, subsystem }: Props) => {
	const router = useRouter();
	const { globalSession } = useContext(GlobalSessionContext);
	const { post } = useApi();

	useEffect(() => {
		if (!router.isReady || !globalSession.loaded) return;
		const id = router.query.id as string;

		post("/api/profile/read-saves", { profileId: globalSession.profileId, properties: [id] }, (saves) => {
			router.replace(`/project/${data.id}/create/${subsystem}/${saves.content[id]?.[subsystem] || "research"}`);
			console.log(saves);
		});

		console.log("subsystem flow saved");
	}, [router, globalSession.loaded, globalSession.profileId, post, subsystem, data]);

	return null;
};

Subsystem.getLayout = (page: ReactElement, pageProps: any) => {
	return (
		<ProjectLayout step="Create" isFlat={true} hasLeftPanel={true} data={pageProps.data} subsystem={pageProps.subsystem}>
			{page}
		</ProjectLayout>
	);
};

Subsystem.auth = "user";

export default Subsystem;

interface Params {
	params: {
		id: string;
		subsystem: string;
	};
}

export async function getStaticProps({ params }: Params) {
	return {
		props: {
			data: ALL_PROJECTS_OBJECT[params.id],
			subsystem: params.subsystem,
		},
	};
}

export async function getStaticPaths() {
	return {
		paths: ALL_PROJECTS_ARRAY.map((project) => {
			return project.subsystems.map((subsystem) => {
				return {
					params: {
						id: project.id,
						subsystem: subsystem.id,
					},
				};
			});
		}).flat(),
		fallback: false,
	};
}
