import { useState, useEffect } from "react";
import router, { useRouter } from "next/router";
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

import getProjectData from "../../utils/getProjectData";
import classes from "/styles/projectView.module.scss";

const steps = {
	define: { title: "Define", icon: "biotech" },
	imagine: { title: "Imagine", icon: "filter_drama" },
	research: { title: "Research", icon: "travel_explore" },
	plan: { title: "Plan", icon: "design_services" },
	create: { title: "Create", icon: "smart_toy" },
	improve: { title: "Improve", icon: "auto_graph" },
	review: { title: "Review", icon: "checklist" },
};

const iterationColors = ["#ff7c7c", "#ffac5f", "#ffe459", "#5fe394", "#47bafb"];

const ProjectTab = ({ step, activeStep, query, iteration }) => {
	return (
		<button className={`${classes.tabWrapper} ${activeStep === step ? classes.activeTab : ""}`} onClick={() => router.push(`/project/${query}/${iteration}/${step}`)}>
			<div className={classes.tab}>
				<span className="material-icons-outlined">{steps[step].icon}</span>
				{steps[step].title}
			</div>
		</button>
	);
};

const ProjectView = ({ setLoaded }) => {
	const router = useRouter();
	const [session, loading] = useSession();
	const [data, setData] = useState({});
	const [step, setStep] = useState("imagine");
	const [view, setView] = useState("project");
	const [iteration, setIteration] = useState(0);

	useEffect(() => {
		return () => setLoaded(true);
	}, []);

	useEffect(() => {
		if (router.query) {
			if (router.query.projectView) {
				const query = router.query.projectView[0];
				const projectData = getProjectData(query);
				if (!projectData) {
					// if project doesn't exist, redirect to browser
					router.replace("/browse");
					return null;
				}
				setData(projectData);
				const subQuery = router.query.projectView[1] || "";
				if (subQuery === "play") {
					// if play
					setView(subQuery);
					setLoaded(false);
				} else if (subQuery === "code") {
					// if code
					setView(subQuery);
					setIteration(parseInt(router.query.projectView[2]) || 0);
					setStep(router.query.projectView[3] || "create");
					setLoaded(false);
				} else {
					// else default project view
					setView("project");
					setIteration(parseInt(subQuery) || 0);
					setStep(router.query.projectView[2] || "define");
					setLoaded(true);
				}
			}
		}
	}, [router.query]);

	useEffect(() => {
		if (iteration >= data?.iterations?.length) {
			setIteration(0);
		}
	}, [iteration, data]);

	useEffect(() => {
		if (!Object.keys(steps).some((v) => v === step)) {
			setStep("imagine");
		}
	}, [step]);

	const backHandler = () => {
		setLoaded(false);
		router.push("/browse");
	};

	if (loading || !data.query) return null;

	return (
		<div className={classes.projectView}>
			<Head>
				<title>
					{steps[step].title} • {data.name} | CreateBase
				</title>
				<meta name="description" content={data.caption} />
			</Head>
			{view === "project" && (
				<>
					<div className={classes.tabContainer}>
						<button className={classes.backBtn} onClick={backHandler}>
							<span className="material-icons-outlined">arrow_back_ios</span>
							Browse
						</button>
						<ProjectTab activeStep={step} step="define" query={data.query} iteration={iteration} />
						<ProjectTab activeStep={step} step="imagine" query={data.query} iteration={iteration} />
						<div className={classes.iterationsContainer}>
							<div className={classes.iterationTitle}>Iteration</div>
							<div className={classes.iterations}>
								{data.iterations.map((_, i) => (
									<button
										key={i}
										className={iteration === i ? classes.active : ""}
										style={{ backgroundColor: iteration === i && iterationColors[i] }}
										onClick={() => router.push(`/project/${data.query}/${i}/${step}`)}>
										{i + 1}
									</button>
								))}
							</div>
							<ProjectTab activeStep={step} step="research" query={data.query} iteration={iteration} />
							<ProjectTab activeStep={step} step="plan" query={data.query} iteration={iteration} />
							<ProjectTab activeStep={step} step="create" query={data.query} iteration={iteration} />
						</div>
						<ProjectTab activeStep={step} step="improve" query={data.query} iteration={iteration} />
						<ProjectTab activeStep={step} step="review" query={data.query} iteration={iteration} />
					</div>
					<div className={classes.viewContainer}>
						{step === "define" && <Define data={data.define} setLoaded={setLoaded} />}
						{step === "imagine" && <Imagine data={data.imagine} setLoaded={setLoaded} query={data.query} />}
						{step === "research" && <Research data={data.iterations[iteration].research} setLoaded={setLoaded} iteration={iteration} />}
						{step === "plan" && <Plan data={data.iterations[iteration].plan} setLoaded={setLoaded} />}
						{step === "create" && <Create query={data.query} data={data.iterations[iteration].create} setLoaded={setLoaded} iteration={iteration} />}
						{step === "improve" && <Improve query={data.query} data={data.improve} setLoaded={setLoaded} />}
						{step === "review" && <Review setLoaded={setLoaded} />}
					</div>
				</>
			)}
			{view === "code" && step === "create" && <Code setLoaded={setLoaded} mode={step} project={data} iteration={iteration} query={data.query} blockList={data.iterations[iteration].blockList} />}
			{view === "code" && step === "improve" && <Code setLoaded={setLoaded} mode={step} project={data} iteration={data.iterations.length - 1} query={data.query} blockList={data.improve.blockList} />}
			{view === "play" && <Play setLoaded={setLoaded} project={data} iteration={data.iterations.length - 1} />}
		</div>
	);
};

export default ProjectView;
