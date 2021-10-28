import { useRouter } from "next/router";
import Head from "next/head";
import { PrimaryButton } from "../../../components/UI/Buttons";
import MainLayout from "../../../components/Layouts/MainLayout/MainLayout";
import InnerLayout from "../../../components/Layouts/InnerLayout/InnerLayout";

import CLASSES_TABS from "../../../constants/classesTabs";

import classes from "/styles/classes.module.scss";

const ClassesTabRoot = () => {
	const router = useRouter();

	return (
		<div className={classes.view}>
			<Head>
				<title>My Groups | CreateBase</title>
				<meta name="description" content="View your classes on CreateBase" />
			</Head>
			<div className={`${classes.container} roundScrollbar`}>
				<div className={classes.wrapper}>
					<div className={classes.h2Container}>
						<h2>My Classes</h2>
						<PrimaryButton className={classes.joinBtn} mainLabel="Join a class" onClick={() => router.push("/classes/join")} />
					</div>
					<div className={classes.cardContainer}>
						<div className={`${classes.card} ${classes.addCard}`} onClick={() => router.push("/classes/new")}>
							<div className={classes.addIcons}>
								<i className="material-icons-outlined">add</i>
								<i className="material-icons-outlined">chair_alt</i>
							</div>
							<div className={classes.groupName}>Create a class</div>
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
				</div>
			</div>
		</div>
	);
};

ClassesTabRoot.getLayout = (page) => {
	return (
		<MainLayout page="classes">
			<InnerLayout tabs={CLASSES_TABS}>{page}</InnerLayout>
		</MainLayout>
	);
};

ClassesTabRoot.authorisation = "user";

export default ClassesTabRoot;
