import { useState, useEffect } from "react";
import router from "next/router";
import Head from "next/head";
import Link from "next/link";
import ProjectLayout from "../../../../components/Layouts/ProjectLayout/ProjectLayout";
import getProjectData from "../../../../utils/getProjectData";
import Img from "../../../../components/UI/Img";
import { PrimaryButton } from "../../../../components/UI/Buttons";

import classes from "/styles/create.module.scss";

const DUMMY_SUBSYSTEMS = [
	{
		title: "Some subsystem",
		requirements: [],
		progress: 1,
		imgSrc: "/heat-seeker/img/thumbnail.png",
		description: "Lorem ipsum dolor sit amet. Et sint illo vel nulla eligendi et repudiandae quia est architecto error et quia asperiores sed natus molestiae est enim rerum",
	},
	{ title: "Another subsystem", requirements: ["Some subsystem"], progress: 1, imgSrc: "/heat-seeker/img/define.jpg" },
	{ title: "Another subsystem", requirements: ["Some subsystem"], progress: 1, imgSrc: "/heat-seeker/img/define.jpg" },
	{ title: "Third subsystem", requirements: ["Some subsystem"], progress: 0.25, imgSrc: "/heat-seeker/img/define.jpg" },
	{ title: "Final subsystem", requirements: ["Another subsystem", "Third subsystem"], imgSrc: "/heat-seeker/img/thumbnail.png" },
];

const Create = () => {
	const [data, setData] = useState();
	const [activeSubsystem, setActiveSubsystem] = useState();

	useEffect(() => {
		if (router.query?.id) {
			const _data = getProjectData(router.query.id);
			setData(_data);
			setActiveSubsystem(_data.subsystems[0]);
		}
	}, [router.query.id]);

	useEffect(() => {
		if (router.query?.subsystem && data) {
			const _subsystem = data.subsystems.find((subsystem) => subsystem.title === router.query.subsystem);
			if (_subsystem) {
				setActiveSubsystem(_subsystem);
			} else {
				router.push("/404");
			}
		}
	}, [router.query.subsystem, data]);

	if (!data) return null;

	// TODO progress tracking

	return (
		<div className={`${classes.view} roundScrollbar`}>
			<Head>
				<title>Create • {data.name} | CreateBase</title>
				<meta name="description" content={data.caption} />
			</Head>
			<div className={classes.leftSide}>
				<div className={classes.headings}>
					<h1>Subsystems</h1>
					<h3>The Create step is made up of one or more subsystems. Each subsystem focuses on part of the overall problem, and some must be done before others. Click on the cards to get started.</h3>
				</div>
				<div className={classes.cardContainer}>
					{data.subsystems.map((subsystem, j) => (
						<Link key={j} href={{ query: { ...router.query, subsystem: subsystem.title } }}>
							<a className={`${classes.card} ${activeSubsystem.title === subsystem.title ? classes.activeCard : ""}`}>
								<h2>{subsystem.title}</h2>
								<div className={classes.reqHead}>Requirements:</div>
								<div className={classes.requirements}>
									{subsystem.requirements.length ? (
										subsystem.requirements
											.map((req, i) => (
												<span key={i} className={data.subsystems.find((_subsystem) => _subsystem.title === req)?.progress === 1 ? classes.completed : ""}>
													{req}
												</span>
											))
											.reduce((prev, curr) => [prev, ", ", curr])
									) : (
										<span className={classes.completed}>None</span>
									)}
								</div>
							</a>
						</Link>
					))}
				</div>
			</div>
			<div className={classes.rightSide}>
				<div className={classes.floatCard}>
					<div className={classes.imgContainer}>
						<Img src={activeSubsystem.imgSrc} layout="fill" objectFit="cover" />
					</div>
					<h2>{activeSubsystem.title}</h2>
					<div className={classes.description}>{activeSubsystem.description}</div>
					<div className={classes.requirements}>
						Requirements:
						{activeSubsystem.requirements.length ? (
							activeSubsystem.requirements.map((req, i) => (
								<div key={i} className={`${classes.item} ${data.subsystems.find((subsystem) => subsystem.title === req)?.progress === 1 ? classes.completed : ""}`}>
									<i className="material-icons-outlined">check</i>
									<div className={classes.dot} />
									<Link href={{ query: { ...router.query, subsystem: req } }}>
										<a>{req}</a>
									</Link>
								</div>
							))
						) : (
							<div className={`${classes.item} ${classes.noneItem}`}>
								<a>None</a>
							</div>
						)}
					</div>
					<Link href={{ pathname: "/code/[id]/[subsystem]", query: { id: router.query.id, subsystem: activeSubsystem.title } }}>
						<div style={{ alignSelf: "flex-end" }}>
							<PrimaryButton className={classes.goBtn} mainLabel="Go" iconRight={<i className="material-icons-outlined">double_arrow</i>} />
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
};

Create.getLayout = (page) => {
	return <ProjectLayout activeStep="create">{page}</ProjectLayout>;
};

Create.auth = "user";

export default Create;
