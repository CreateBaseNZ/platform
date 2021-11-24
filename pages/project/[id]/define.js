import { useState, useEffect } from "react";
import router from "next/router";
import Head from "next/head";
import ProjectLayout from "../../../components/Layouts/ProjectLayout/ProjectLayout";
import Img from "../../../components/UI/Img";
import VideoViewer from "../../../components/UI/VideoViewer";
import getProjectData from "../../../utils/getProjectData";

import classes from "/styles/define.module.scss";

const Define = () => {
	const [data, setData] = useState();

	useEffect(() => {
		if (router.query.id) {
			setData(getProjectData(router.query.id));
		}
	}, [router.query.id]);

	if (!data) return null;

	return (
		<div className={`${classes.container} roundScrollbar`}>
			<Head>
				<title>Define • {data.name} | CreateBase</title>
				<meta name="description" content={data.caption} />
			</Head>
			<div className={classes.wrapper}>
				{data && <VideoViewer data={data.define} />}
				{data && data.define.word && data.define.docs && (
					<div className={classes.instructions}>
						<div className={classes.imgContainer}>
							<Img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/define.svg" alt="Define" layout="fill" objectFit="contain" />
						</div>
						<div className={classes.content}>
							<p>Open one of the learning journals and save it somewhere that you can access. Your teacher will tell you which file to open and where to save your copy.</p>
							<div className={classes.files}>
								<a href={data.define.docs} target="_blank" title="Learning Journal - Google Docs" style={{ backgroundColor: "#3086F6" }}>
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
			</div>
		</div>
	);
};

Define.getLayout = (page) => {
	return <ProjectLayout activeStep="define">{page}</ProjectLayout>;
};

Define.auth = "user";

export default Define;
