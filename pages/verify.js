import Head from "next/head";
import VerifyForm from "../components/Auth/VerifyForm";
import AuthLayout from "../components/Layouts/AuthLayout/AuthLayout";

import classes from "/styles/auth.module.scss";

const Verify = () => {
	return (
		<>
			<Head>
				<title>Verify | CreateBase</title>
				<meta name="description" content="Verify your CreateBase account" />
			</Head>
			<div className={`${classes.authMain} ${classes.verifyMain}`}>
				<VerifyForm />
			</div>
		</>
	);
};

Verify.authorisation = "user";

Verify.getLayout = (page) => {
	return <AuthLayout>{page}</AuthLayout>;
};

export default Verify;
