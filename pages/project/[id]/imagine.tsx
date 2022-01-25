import { useState, useEffect, useContext, ReactElement } from "react";
import router from "next/router";
import useMixpanel from "../../../hooks/useMixpanel";
import GlobalSessionContext from "../../../store/global-session-context";
import { ALL_PROJECTS_OBJECT, ALL_PROJECTS_ARRAY } from "../../../constants/projects";
import NewProjectLayout from "../../../components/Layouts/ProjectLayout/NewProjectLayout";
import TutorialModule from "../../../components/Project/TutorialModule";
import BlankModule from "../../../components/Project/BlankModule";
import PdfModule from "../../../components/Project/PdfModule";
import NoModule from "../../../components/Project/NoModule";
import { IProjectReadOnly } from "../../../types/projects";
import { IPdfModule, ITutorialModule } from "../../../types/modules";

import classes from "../../../styles/imagine.module.scss";

interface Props {
	data: IProjectReadOnly;
}

const renderModule = (module: any) => {
	switch (module?.type) {
		case "pdf":
			return <PdfModule module={module as IPdfModule} />;
		case "tutorial":
			return <TutorialModule module={module as ITutorialModule} />;
		default:
			return <BlankModule />;
	}
};

const Imagine = ({ data }: Props) => {
	const { globalSession } = useContext(GlobalSessionContext);
	const [active, setActive] = useState(-1);
	const mp = useMixpanel();

	useEffect(() => {
		mp.init();
		const clearSession = mp.trackActiveSession("project_imagine", {
			licenses: globalSession.groups.map((group) => group.licenseId),
			schools: globalSession.groups.map((group) => group.id),
			project: router.query.id,
		});
		return () => clearSession();
	}, []);

	if (!data) return null;

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
				{renderModule(data.imagine.modules[active])}
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
