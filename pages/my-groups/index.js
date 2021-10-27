import { useContext } from "react";
import Head from "next/head";
import MainLayout from "../../components/Layouts/MainLayout/MainLayout";
import UserSessionContext from "../../store/user-session";

import classes from "/styles/myGroups.module.scss";
import { PrimaryButton } from "../../components/UI/Buttons";

const DUMMY_SCHOOLS = [
	{ name: "Botany Downs Secondary School", role: "teacher", numOfAdmins: 1, numOfTeachers: 3, numOfStudents: 78 },
	{ name: "Rosehill College", role: "admin", numOfAdmins: 2, numOfTeachers: 2, numOfStudents: 64 },
	{ name: "Shelly Park Primary", role: "student", numOfAdmins: 1, numOfTeachers: 1, numOfStudents: 34 },
	{ name: "School trial", role: "admin", numOfAdmins: 1, numOfTeachers: 0, numOfStudents: 0 },
];

const DUMMY_FAMILIES = [
	{ name: "The Doe's", role: "member", numOfMembers: 5 },
	{ name: "Family trial", role: "admin", numOfMembers: 1 },
];

const MyGroups = () => {
	const { setUserSession } = useContext(UserSessionContext);

	return (
		<div className={`${classes.view} roundScrollbar`}>
			<Head>
				<title>My Groups | CreateBase</title>
				<meta name="description" content="View your groups on CreateBase" />
			</Head>
			<div className={classes.container}>
				<div className={classes.h2Container}>
					<h2>Schools</h2>
					<PrimaryButton className={classes.joinBtn} mainLabel="Join a school" />
				</div>
				<div className={classes.cardContainer}>
					{DUMMY_SCHOOLS.map((group) => (
						<div className={classes.card}>
							<div className={classes.groupRole}>{group.role}</div>
							<div className={classes.groupName}>{group.name}</div>
							<div className={classes.groupNums}>
								{group.numOfAdmins} admins, {group.numOfTeachers} teachers, {group.numOfStudents} students
							</div>
						</div>
					))}
				</div>
				<div className={classes.h2Container}>
					<h2>Families</h2>
					<PrimaryButton className={classes.joinBtn} mainLabel="Join a family" />
				</div>
				<div className={classes.cardContainer}>
					{DUMMY_FAMILIES.map((group) => (
						<div className={classes.card}>
							<div className={classes.groupRole}>{group.role}</div>
							<div className={classes.groupName}>{group.name}</div>
							<div className={classes.groupNums}>{group.numOfMembers} members</div>
						</div>
					))}
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
