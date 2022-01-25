import { useEffect, useContext, ReactElement, useState } from "react";
import Image from "next/image";
import YouTube from "react-youtube";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import useMixpanel from "../../../hooks/useMixpanel";
import GlobalSessionContext from "../../../store/global-session-context";
import { ALL_PROJECTS_OBJECT, ALL_PROJECTS_ARRAY } from "../../../constants/projects";
import { IProjectReadOnly } from "../../../types/projects";
import NewProjectLayout from "../../../components/Layouts/ProjectLayout/NewProjectLayout";

import classes from "/styles/define.module.scss";

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
			<div className={classes.thumbnailContainer}>
				<div className={`${classes.thumbnailWrapper} ${showVid ? classes.shrink : ""}`}>
					<Image
						src={`https://raw.githubusercontent.com/CreateBaseNZ/public/dev/projects/${data.id}/images/thumbnail.png`}
						layout="fill"
						objectFit="cover"
						objectPosition="center 25%"
						alt={data.title}
					/>
				</div>
			</div>
			<main className={classes.main}>
				<div className={classes.videoContainer}>
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
						<div className={classes.playContainer} onClick={() => setShowVid(true)} title="Play">
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
		<NewProjectLayout step="Define" data={data.data}>
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
