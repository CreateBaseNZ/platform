import { useState, useEffect, useContext, useRef } from "react";
import router from "next/router";
import Head from "next/head";
import useMixpanel from "../../../hooks/useMixpanel";
import GlobalSessionContext from "../../../store/global-session-context";
import ProjectLayout from "../../../components/Layouts/ProjectLayout/ProjectLayout";
import Img from "../../../components/UI/Img";
import VideoViewer from "../../../components/Project/VideoViewer";
import getProjectData from "../../../utils/getProjectData";

import classes from "/styles/define.module.scss";
import useApi from "../../../hooks/useApi";

const Define = () => {
	const timerRef = useRef();
	const linkRef = useRef();
	const { globalSession } = useContext(GlobalSessionContext);
	const [data, setData] = useState();
	const mp = useMixpanel();
	const { post } = useApi();
	const [saveStatus, setSaveStatus] = useState();

	console.log(saveStatus);

	useEffect(() => {
		mp.init();
		const clearSession = mp.trackActiveSession("project_define", {
			licenses: globalSession.groups.map((group) => group.licenseId),
			schools: globalSession.groups.map((group) => group.id),
			project: router.query.id,
		});
		return () => clearSession();
	}, []);

	useEffect(() => {
		if (router.query.id) {
			setData(getProjectData(router.query.id));
		}
	}, [router.query.id]);

	useEffect(() => {
		globalSession.groups.length &&
			(async () => {
				post(
					"/api/profile/read-saves",
					{
						profileId: globalSession.profileId,
						properties: [`${globalSession.groups[globalSession.recentGroups[0]].licenseId}__${router.query.id}`],
						date: new Date().toString(),
					},
					(data) => {
						linkRef.current.value = data.content[`${globalSession.groups[globalSession.recentGroups[0]].licenseId}__${router.query.id}`] || "";
					}
				);
			})();
	}, []);

	const journalLinkChangeHandler = (e) => {
		console.log(e.target.value);
		if (globalSession.groups.length) {
			setSaveStatus("pending");
			post(
				"/api/profile/update-saves",
				{
					profileId: globalSession.profileId,
					update: { [`${globalSession.groups[globalSession.recentGroups[0]].licenseId}__${router.query.id}`]: e.target.value },
					date: new Date().toString(),
				},
				() => {
					setSaveStatus("success");
				}
			);
		}
	};

	if (!data) return null;

	return (
		<div className={`${classes.container} roundScrollbar`}>
			<Head>
				<title>Define • {data.name} | CreateBase</title>
				<meta name="description" content={data.caption} />
			</Head>
			<div className={classes.wrapper}>
				{data && <VideoViewer data={data.define} title={data.name} />}
				{data && data.define.word && data.define.docs && (
					<div className={classes.instructions}>
						<div className={classes.imgContainer}>
							<Img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/project-pages/define.svg" alt="Define" layout="fill" objectFit="contain" label="Illustration by Storyset" />
						</div>
						<div className={classes.content}>
							<p>Open one of the learning journals and save it somewhere that you can access. Your teacher will tell you which file to open and where to save your copy.</p>
							<div className={classes.files}>
								<a href={data.define.docs} target="_blank" title="Learning Journal - Google Docs" style={{ backgroundColor: "#3086F6" }} rel="noreferrer">
									<div className={classes.iconContainer}>
										<span className="material-icons-outlined">link</span>
									</div>
									Google Docs
								</a>
								<a href={data.define.word} title="Learning Journal - Word" download style={{ backgroundColor: "#144EB2" }}>
									<div className={classes.iconContainer}>
										<span className="material-icons-outlined">file_download</span>
									</div>
									Word
								</a>
							</div>
						</div>
					</div>
				)}
				{data && data.define.word && data.define.docs && (
					<div className={classes.journalLink}>
						<label>If your learning journal is on Google Docs, paste the link below:</label>
						<input onChange={journalLinkChangeHandler} ref={linkRef} />
						<div className={classes.saveStatus}>
							{saveStatus === "pending" && "Saving ..."}
							{saveStatus === "success" && (
								<>
									<i className="material-icons-outlined">done</i>Saved
								</>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

Define.getLayout = (page) => {
	return <ProjectLayout activeStep="define">{page}</ProjectLayout>;
};

Define.auth = "user";

export default Define;
