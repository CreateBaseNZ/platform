import Head from "next/head";
import router from "next/router";
import { useEffect, useState } from "react";
import ProjectLayout from "../../../../../components/Layouts/ProjectLayout/ProjectLayout";
import SubsystemLayout from "../../../../../components/Layouts/SubsystemLayout/SubsystemLayout";
import getProjectData from "../../../../../utils/getProjectData";
import ModuleContainer from "../../../../../components/UI/ModuleContainer";
import VideoViewer from "../../../../../components/UI/VideoViewer";
import Img from "../../../../../components/UI/Img";
import classes from "/styles/research.module.scss";

const Research = () => {
	const [subsystemData, setSubsystemData] = useState();
	const [activeModule, setActiveModule] = useState(0);

	useEffect(() => {
		const projectData = getProjectData(router.query?.id);
		if (projectData && router.query.subsystem) {
			setSubsystemData(projectData.subsystems.find((subsystem) => subsystem.title === router.query.subsystem));
		}
	}, [router.query.id, router.query.subystem]);

	if (!subsystemData) return null;

	console.log(subsystemData);

	return (
		<div className={classes.view}>
			<Head>
				<title>Research • {subsystemData.title} | CreateBase</title>
				<meta name="description" content={subsystemData.description} />
			</Head>
			<ModuleContainer active={activeModule} clickHandler={(i) => setActiveModule(i)} modules={subsystemData.research.modules} caption={subsystemData.research.caption} showManualBtn={false} />
			<div className={classes.mainContainer}>
				{(subsystemData.research.modules[activeModule]?.type === "pdf" || subsystemData.research.modules[activeModule]?.type === "task") && (
					<div style={{ width: "100%", height: "100%" }}>
						<embed src={subsystemData.research.modules[activeModule].url} width="100%" height="100%" />
					</div>
				)}
				{subsystemData.research.modules[activeModule]?.type === "video" && (
					<div style={{ width: "85%" }}>
						<VideoViewer data={subsystemData.research.modules[activeModule].data} />
					</div>
				)}
				{subsystemData.research.modules[activeModule]?.type === "tut" && (
					<div className={`${classes.tutWrapper} roundScrollbar`}>
						{subsystemData.research.modules[activeModule].items &&
							subsystemData.research.modules[activeModule].items.map((d, i) => (
								<div key={i} className={classes.item}>
									<VideoViewer
										data={d}
										attributes={{
											autoPlay: true,
											loop: true,
											muted: true,
											allow: "autoplay",
										}}
										controls={false}
										captionClass={classes.caption}
									/>
								</div>
							))}
					</div>
				)}
				{subsystemData.research.modules[activeModule]?.type === "explore" && (
					<div className={classes.exploreWrapper}>
						{subsystemData.research.modules[activeModule] &&
							subsystemData.research.modules[activeModule].items.map((item, i) => (
								<a key={i} href={item.url} className={classes.exploreItem} title={`Launch ${item.title}`}>
									<div
										className={classes.imgContainer}
										style={{
											background: `linear-gradient(to bottom right, ${item.col1}, ${item.col2})`,
										}}>
										<div className={classes.imgWrapper}>
											<Img src={item.img} layout="fill" objectFit="cover" />
										</div>
										<span className="material-icons-outlined">launch</span>
										<h3>{item.title}</h3>
									</div>
									<div className={classes.caption}>{item.caption}</div>
								</a>
							))}
					</div>
				)}
			</div>
		</div>
	);
};

Research.getLayout = (page) => {
	return (
		<ProjectLayout activeStep="create">
			<SubsystemLayout activeTab="research">{page}</SubsystemLayout>;
		</ProjectLayout>
	);
};

Research.auth = "user";

export default Research;
