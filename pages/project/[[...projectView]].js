import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import Head from "next/head";
import Link from "next/link";

import Research from "../../components/Project/Research";
import Plan from "../../components/Project/Plan";
import Create from "../../components/Project/Create";
import Improve from "../../components/Project/Improve";
import Imagine from "../../components/Project/Imagine";
import Define from "../../components/Project/Define";
import Review from "../../components/Project/Review";
import Play from "../../components/Play";
import Code from "../../components/Code/Code";

import classes from "/styles/ProjectView.module.scss";
import getProjectData from "../../utils/getProjectData";

const steps = [
	{ title: "Imagine", icon: "filter_drama" },
	{ title: "Define", icon: "biotech" },
	{ title: "Research", icon: "travel_explore" },
	{ title: "Plan", icon: "design_services" },
	{ title: "Create", icon: "smart_toy" },
	{ title: "Improve", icon: "auto_graph" },
	{ title: "Review", icon: "checklist" },
];

const ProjectView = ({ setLoaded }) => {
	const router = useRouter();
	const [session, loading] = useSession();
	const [data, setData] = useState({});
	const [step, setStep] = useState("Imagine");
	const [view, setView] = useState("Project");

	useEffect(() => setLoaded(true), []);

	useEffect(() => {
		console.log(router.query);
		if (router.query) {
			if (router.query.projectView) {
				const query = router.query.projectView[0];
				const projectData = getProjectData(query);
				if (!projectData) {
					router.replace("/browse");
					return null;
				}
				setData(projectData);
				const subQuery = router.query.projectView[1] || "";
				if (subQuery === "play") {
					setView(subQuery[0].toUpperCase() + subQuery.substring(1));
					setLoaded(false);
				} else if (subQuery.toLowerCase() === "code") {
					setView(subQuery[0].toUpperCase() + subQuery.substring(1));
					const subSubQuery = router.query.projectView[2];
					if (subSubQuery) {
						setStep(subSubQuery[0].toUpperCase() + subSubQuery.substring(1));
					} else {
						router.replace(router.asPath + "/create");
					}
					setLoaded(false);
				} else {
					setView("Project");
					if (subQuery) {
						setStep(subQuery[0].toUpperCase() + subQuery.substring(1));
					} else {
						router.replace(router.asPath + "/imagine");
					}
					setLoaded(true);
				}
			}
		}
	}, [router.query]);

	if (loading || !data.query) return null;

	return (
		<div className={classes.projectView}>
			<Head>
				<title>
					{view === "Project" ? step : view} • {data.name} | CreateBase
				</title>
				<meta name="description" content={data.caption} />
			</Head>
			{view === "Project" && (
				<>
					<div className={classes.tabContainer}>
						<Link href="/browse">
							<button className={classes.backBtn}>
								<span className="material-icons-outlined">arrow_back_ios</span>
								Browse
							</button>
						</Link>
						{steps.map((s, i) => (
							<button
								key={i}
								className={`${classes.tabWrapper} ${step === s.title ? classes.activeTab : ""}`}
								onClick={() =>
									router.push({
										pathname: `/project/${data.query}/${s.title.toLowerCase()}`,
									})
								}>
								<div className={classes.tab}>
									<span className="material-icons-outlined">{s.icon}</span>
									{s.title}
								</div>
							</button>
						))}
					</div>
					<div className={classes.viewContainer}>
						{step === "Imagine" && <Imagine data={data.situation} setLoaded={setLoaded} />}
						{step === "Define" && <Define data={data.define} caption={data.defineCaption} setLoaded={setLoaded} />}
						{step === "Research" && <Research query={data.query} data={data.research} caption={data.researchCaption} setLoaded={setLoaded} />}
						{step === "Plan" && <Plan data={data.plan} setLoaded={setLoaded} />}
						{step === "Create" && <Create query={data.query} data={data.create} setLoaded={setLoaded} />}
						{step === "Improve" && <Improve query={data.query} data={data.improve} setLoaded={setLoaded} />}
						{step === "Review" && <Review setLoaded={setLoaded} />}
					</div>
				</>
			)}
			{view === "Code" && (step === "Create" || step === "Improve") && <Code setLoaded={setLoaded} mode={step} project={data} />}
			{view === "Play" && <Play setLoaded={setLoaded} project={data} />}
		</div>
	);
};

export default ProjectView;
