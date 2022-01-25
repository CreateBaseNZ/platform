import { useState, useEffect, useContext, ReactElement } from "react";
import router from "next/router";
import useMixpanel from "../../../hooks/useMixpanel";
import GlobalSessionContext from "../../../store/global-session-context";
import getProjectData, { ALL_PROJECTS_ARRAY } from "../../../lib/getProjectData";

import classes from "../../../styles/imagine.module.scss";
import NewProjectLayout from "../../../components/Layouts/ProjectLayout/NewProjectLayout";
import { IProjectReadOnly } from "../../../types/newProjects";
import PdfModule from "../../../components/Project/PdfModule";
import { PDFModule, TutModule } from "../../../types/modules";
import TutorialModule from "../../../components/Project/TutorialModule";

interface Props {
	data: IProjectReadOnly;
}

const Imagine = ({ data }: Props) => {
	const { globalSession } = useContext(GlobalSessionContext);
	const [active, setActive] = useState(0);
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
			<aside className={classes.aside}>
				<div className={classes.header}>Modules</div>
				{data.imagine.modules.map((mod, i) => (
					<button key={mod.title} className={i === active ? classes.active : ""} title={mod.title} onClick={() => setActive(i)}>
						{mod.title}
					</button>
				))}
			</aside>
			<main className={classes.main}>
				{data.imagine.modules[active].type === "pdf" && <PdfModule module={data.imagine.modules[active] as PDFModule} />}
				{data.imagine.modules[active].type === "tutorial" && <TutorialModule module={data.imagine.modules[active] as TutModule} />}
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
			data: getProjectData(params.id),
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
