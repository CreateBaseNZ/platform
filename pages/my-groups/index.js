import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import GlobalSessionContext from "../../store/global-session-context";
import MainLayout from "../../components/Layouts/MainLayout/MainLayout";
import { PrimaryButton } from "../../components/UI/Buttons";

import classes from "/styles/myGroups.module.scss";
import useHandleResponse from "../../hooks/useHandleResponse";

const MyGroups = () => {
	const router = useRouter();
	const { globalSession, setGlobalSession } = useContext(GlobalSessionContext);
	const { handleResponse } = useHandleResponse();
	const [allGroups, setAllGroups] = useState([]);

	useEffect(async () => {
		const details = { id: globalSession.accountId };
		const DUMMY_STATUS = "succeeded";
		let data = {};
		try {
			data = (await axios.post("/api/groups/fetch-joined", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: details, status: DUMMY_STATUS }))["data"];
		} catch (error) {
			data.status = "error";
		} finally {
			handleResponse({
				data,
				failHandler: () => {},
				successHandler: () => {
					setAllGroups(data.content);
				},
			});
		}
	}, []);

	const cardClickHandler = (group) =>
		setGlobalSession((state) => ({ ...state, isViewingGroup: true, recentGroups: [group, ...state.recentGroups.filter((_group) => _group.id !== group.id)].slice(0, 3) }));

	return (
		<div className={classes.view}>
			<Head>
				<title>My Groups | CreateBase</title>
				<meta name="description" content="View your groups on CreateBase" />
			</Head>
			<div className={`${classes.container} roundScrollbar`}>
				<div className={classes.wrapper}>
					<div className={classes.h2Container}>
						<h2>Schools</h2>
						<PrimaryButton className={classes.joinBtn} mainLabel="Join a school" onClick={() => router.push("/my-groups/join-school")} />
					</div>
					<div className={classes.cardContainer}>
						<div className={`${classes.card} ${classes.addCard}`} onClick={() => router.push("/my-groups/new-school")}>
							<div className={classes.addIcons}>
								<i className="material-icons-outlined">add</i>
								<i className="material-icons-outlined">holiday_village</i>
							</div>
							<div className={classes.groupName}>Register a school</div>
						</div>
						{allGroups
							.filter((group) => group.type === "school")
							.map((group) => (
								<div
									key={group.name}
									className={`${classes.card} ${globalSession.isViewingGroup && globalSession.recentGroups[0].id === group.id ? classes.activeCard : ""}`}
									onClick={() => cardClickHandler(group)}>
									<div className={classes.groupRole}>
										{group.role} {globalSession.isViewingGroup && globalSession.recentGroups[0].id === group.id ? " (viewing)" : ""}
									</div>
									<div className={classes.groupName}>{group.name}</div>
									<div className={classes.groupNums}>
										{group.numOfUsers.admins} admin{group.numOfUsers.admins === 1 ? "" : "s"}, {group.numOfUsers.teachers} teacher{group.numOfUsers.teachers === 1 ? "" : "s"},{" "}
										{group.numOfUsers.students} student{group.numOfUsers.students === 1 ? "" : "s"}
									</div>
								</div>
							))}
					</div>
					<div className={classes.h2Container}>
						<h2>Families</h2>
						<PrimaryButton className={classes.joinBtn} mainLabel="Join a family" onClick={() => router.push("/my-groups/join-family")} />
					</div>
					<div className={classes.cardContainer}>
						<div className={`${classes.card} ${classes.addCard}`} onClick={() => router.push("/my-groups/new-family")}>
							<div className={classes.addIcons}>
								<i className="material-icons-outlined">add</i>
								<i className="material-icons-outlined">cottage</i>
							</div>
							<div className={classes.groupName}>Create a family</div>
						</div>
						{allGroups
							.filter((group) => group.groupType === "family")
							.map((group) => (
								<div key={group.name} className={classes.card}>
									<div className={classes.groupRole}>{group.role}</div>
									<div className={classes.groupName}>{group.name}</div>
									<div className={classes.groupNums}>
										{group.numOfUsers.members} member{group.numOfUsers.members === 1 ? "" : "s"}
									</div>
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	);
};

MyGroups.getLayout = (page) => {
	return <MainLayout page="my-groups">{page}</MainLayout>;
};

MyGroups.auth = "user";

export default MyGroups;
