import { useContext } from "react";
import Head from "next/head";
import MainLayout from "../../components/Layouts/MainLayout/MainLayout";
import UserSessionContext from "../../store/user-session";

import classes from "/styles/myGroups.module.scss";
import { PrimaryButton } from "../../components/UI/Buttons";
import { useRouter } from "next/router";

const DUMMY_GROUPS = [
	{ groupName: "Botany Downs Secondary School", role: "teacher", numOfUsers: { admins: 1, teachers: 3, students: 78 }, groupType: "school" },
	{ groupName: "Rosehill College", role: "admin", numOfUsers: { admins: 2, teachers: 2, students: 64 }, groupType: "school" },
	{ groupName: "Shelly Park Primary", role: "student", numOfUsers: { admins: 1, teachers: 1, students: 34 }, groupType: "school" },
	{ groupName: "School trial as an admin", role: "admin", numOfUsers: { admins: 1, teachers: 0, students: 0 }, groupType: "school" },
	{ groupName: "The Doe's", role: "member", numOfUsers: { members: 5 }, groupType: "family" },
	{ groupName: "Family trial as an admin", role: "admin", numOfUsers: { members: 1 }, groupType: "family" },
];

const DUMMY_FAMILIES = [];

const MyGroups = () => {
	const router = useRouter();
	const { userSession, setUserSession } = useContext(UserSessionContext);

	const cardClickHandler = (group) => {
		setUserSession((state) => ({ ...state, view: group }));
	};

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
						{DUMMY_GROUPS.filter((group) => group.groupType === "school").map((group) => (
							<div key={group.groupName} className={classes.card} onClick={() => cardClickHandler(group)}>
								<div className={classes.groupRole}>{group.role}</div>
								<div className={classes.groupName}>{group.groupName}</div>
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
						{DUMMY_GROUPS.filter((group) => group.groupType === "family").map((group) => (
							<div key={group.groupName} className={classes.card}>
								<div className={classes.groupRole}>{group.role}</div>
								<div className={classes.groupName}>{group.groupName}</div>
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

MyGroups.authorisation = "user";

export default MyGroups;
