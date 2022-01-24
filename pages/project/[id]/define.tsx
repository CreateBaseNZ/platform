import { useEffect, useContext, ReactElement, useState } from "react";
import Image from "next/Image";
import YouTube from "react-youtube";
import { useRouter } from "next/router";
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
	const [showVid, setShowVid] = useState(false);
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
			{!showVid && (
				<div className={classes.mediaContainer}>
					<div className={classes.mediaWrapper}>
						<Image src={`https://raw.githubusercontent.com/CreateBaseNZ/public/dev/${data.id}/img/thumbnail.png`} layout="fill" objectFit="cover" objectPosition="center 25%" alt={data.title} />
					</div>
				</div>
			)}
			<main className={classes.main}>
				<div className={classes.mediaClick}>
					{showVid && (
						<div className={classes.vidWrapper}>
							<YouTube
								videoId={data.videoId}
								title={data.title}
								className={classes.video}
								opts={{ height: "100%", width: "100%", playerVars: { autoplay: 1 } }}
								onEnd={() => setTimeout(() => setShowVid(false), 100)}
							/>
						</div>
					)}
					{!showVid && (
						<div className={classes.clickable} onClick={() => setShowVid(true)} title="Play">
							<button>
								<i className="material-icons">play_arrow</i>
							</button>
						</div>
					)}
				</div>
				<div className={classes.container}>
					<h1>{data.title}</h1>
					<h2>{data.subtitle}</h2>
					<ReactMarkdown>{data.define.md}</ReactMarkdown>
				</div>
			</main>
		</div>
	);
};

Define.getLayout = (page: ReactElement, data: any) => {
	return (
		<NewProjectLayout step="define" data={data.data}>
			{page}
		</NewProjectLayout>
	);
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
