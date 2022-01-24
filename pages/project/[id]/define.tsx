import { useEffect, useContext, ReactElement } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import useMixpanel from "../../../hooks/useMixpanel";
import ReactMarkdown from "react-markdown";
import GlobalSessionContext from "../../../store/global-session-context";
import { ALL_PROJECTS_ARRAY } from "../../../lib/getProjectData";
import getProjectData from "../../../lib/getProjectData";

import NewProjectLayout from "../../../components/Layouts/ProjectLayout/NewProjectLayout";

import classes from "/styles/define.module.scss";
import { IProjectReadOnly } from "../../../types/newProjects";

interface Props {
	data: IProjectReadOnly;
}

const Define = ({ data }: Props) => {
	const router = useRouter();
	const { globalSession } = useContext(GlobalSessionContext);
	const mp = useMixpanel();

	useEffect(() => {
		mp.init();
		const clearSession = mp.trackActiveSession("project_define", {
			licenses: globalSession.groups.map((group) => group.licenseId),
			schools: globalSession.groups.map((group) => group.id),
			project: router.query.id,
		});
		return () => clearSession();
	}, []);

	return (
		<div className={classes.page}>
			<Head>
				<title>Define • {data.title} | CreateBase</title>
				<meta name="description" content={data.description} />
			</Head>
			<div className={classes.mediaContainer}>
				<div className={classes.mediaWrapper}>
					<iframe
						width="100%"
						height="100%"
						src={data.situationVideo}
						title={data.title}
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
						className={classes.video}></iframe>
				</div>
			</div>
			<main className={classes.main}>
				<div className={classes.container}>
					<h1>{data.title}</h1>
					<h2>{data.subtitle}</h2>
					<ReactMarkdown>{data.define.md}</ReactMarkdown>
				</div>
			</main>
		</div>
	);
};

Define.getLayout = (page: ReactElement) => {
	return <NewProjectLayout step="define">{page}</NewProjectLayout>;
};

Define.auth = "user";

export default Define;

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
