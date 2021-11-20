import Head from "next/head";
import Link from "next/link";
import MainLayout from "../../components/Layouts/MainLayout/MainLayout";
import JoinSchoolStudent from "../../components/MyGroups/JoinSchoolStudent";
import JoinSchoolTeacher from "../../components/MyGroups/JoinSchoolTeacher";

import classes from "../../styles/myGroups.module.scss";

const JoinSchool = () => {
	return (
		<div className={classes.view}>
			<Head>
				<title>Join a School | CreateBase</title>
				<meta name="description" content="Join your school group on CreateBase" />
			</Head>
			<Link href="/my-groups">
				<button className={classes.backBtn}>
					<i className="material-icons-outlined">chevron_left</i>Back
				</button>
			</Link>
			<div className={`${classes.container} roundScrollbar`}>
				<div className={`${classes.wrapper} ${classes.formWrapper}`}>
					<div className={classes.h2Container}>
						<h2>Join a school as a student</h2>
					</div>
					<JoinSchoolStudent />
					<div className={classes.divider} />
					<div className={classes.h2Container}>
						<h2>Join a school as a teacher</h2>
					</div>
					<JoinSchoolTeacher />
				</div>
			</div>
		</div>
	);
};

JoinSchool.getLayout = (page) => {
	return <MainLayout page="my-groups">{page}</MainLayout>;
};

JoinSchool.auth = "user";

export default JoinSchool;
