import { useState, useEffect, useContext, ReactElement } from "react";
import useMixpanel from "../../../hooks/useMixpanel";
import GlobalSessionContext from "../../../store/global-session-context";
import useApi from "../../../hooks/useApi";
import renderModule from "../../../lib/renderModule";
import { TModule } from "../../../types/modules";
import { ALL_PROJECTS_OBJECT, ALL_PROJECTS_ARRAY } from "../../../constants/projects";
import NewProjectLayout from "../../../components/Layouts/ProjectLayout/NewProjectLayout";
import NoModule from "../../../components/Project/NoModule";
import { TProject } from "../../../types/projects";

import classes from "../../../styles/imagine.module.scss";

interface Props {
	data: TProject;
}

const Imagine = ({ data }: Props) => {
	const { globalSession } = useContext(GlobalSessionContext);
	const [active, setActive] = useState(-1);
	const {} = useMixpanel("project_imagine");
	const { post } = useApi();

	useEffect(() => {
		if (!globalSession.loaded) return;
		console.log("imagine page saved");
		post("/api/profile/update-saves", { profileId: globalSession.profileId, update: { [data.id]: { step: "imagine" } }, date: new Date().toString() });
	}, [globalSession.loaded, globalSession.profileId, data.id, post]);

	return (
		<div className={`${classes.page} roundScrollbar`}>
			{data.imagine.modules.length > 0 && (
				<aside className={`${classes.aside} ${active === -1 ? classes.blink : ""}`}>
					<div className={classes.header}>Modules</div>
					{data.imagine.modules.map((mod, i) => (
						<button key={mod.title} className={i === active ? classes.active : ""} title={mod.title} onClick={() => setActive(i)}>
							{mod.title}
						</button>
					))}
				</aside>
			)}
			<main className={classes.main}>
				{renderModule(data.imagine.modules[active] as TModule, data)}
				{data.imagine.modules.length === 0 && <NoModule />}
			</main>
		</div>
	);
};

Imagine.getLayout = (page: ReactElement, data: any) => {
	return (
		<NewProjectLayout step="Imagine" data={data.data}>
			{page}
		</NewProjectLayout>
	);
};

Imagine.auth = "user";

export default Imagine;

interface Params {
	params: {
		id: string;
	};
}

export async function getStaticProps({ params }: Params) {
	console.log(params);
	return {
		props: {
			data: ALL_PROJECTS_OBJECT[params.id],
		},
	};
}

export async function getStaticPaths() {
	return {
		paths: ALL_PROJECTS_ARRAY.map((project) => {
			return {
				params: {
					id: project.id,
				},
			};
		}),
		fallback: false,
	};
}
