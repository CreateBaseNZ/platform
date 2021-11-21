import Head from "next/head";
import { useContext } from "react";
import MainLayout from "../components/Layouts/MainLayout/MainLayout";
import { PrimaryButton, SecondaryButton } from "../components/UI/Buttons";
import { SearchBar } from "../components/UI/Input";
import GlobalSessionContext from "../store/global-session-context";
import styles from "../styles/_exports.module.scss";

import classes from "../styles/support.module.scss";
import { signIn } from "next-auth/react";
import UserCard from "../components/Support/UserCard";

const Support = () => {
	const { globalSession } = useContext(GlobalSessionContext);

	return (
		<div className={`${classes.support} roundScrollbar`}>
			<Head>
				<title>Support Center | CreateBase</title>
				<meta name="description" content="CreateBase Support Center." />
			</Head>
			<div className={classes.banner}>
				<div className={`${classes.shape} ${classes.red}`} />
				<div className={`${classes.shape} ${classes.green}`} />
				<div className={`${classes.shape} ${classes.blue}`} />
				<div className={`${classes.shape} ${classes.yellow}`} />
				<div className={classes.bannerContent}>
					<h2>Support Center</h2>
					<h1>How can we help you{globalSession.accountId ? `, ${globalSession.firstName}` : ""}?</h1>
					<SearchBar className={classes.searchbar} />
				</div>
				{!globalSession.accountId && (
					<div className={classes.auth}>
						<PrimaryButton mainLabel="Sign up" className={classes.signup} onClick={signIn} />
						<SecondaryButton mainLabel="Log in" className={classes.login} onClick={signIn} />
					</div>
				)}
			</div>
			<div className={classes.body}>
				<UserCard title="Students" imgSrc="https://raw.githubusercontent.com/CreateBaseNZ/public/main/support/students.svg" />
				<UserCard title="Teachers" imgSrc="https://raw.githubusercontent.com/CreateBaseNZ/public/main/support/teachers.svg" />
				<UserCard title="Admins" imgSrc="https://raw.githubusercontent.com/CreateBaseNZ/public/main/support/admins.svg" />
			</div>
		</div>
	);
};

Support.getLayout = (page) => {
	return <MainLayout page="support">{page}</MainLayout>;
};

export default Support;
