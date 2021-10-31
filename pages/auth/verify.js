import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import VerifyForm from "../../components/Auth/VerifyForm";
import AuthLayout from "../../components/Layouts/AuthLayout/AuthLayout";

import classes from "/styles/auth.module.scss";

const Verify = () => {
	const { data: session, status } = useSession();
	const router = useRouter();

	if (status === "loading") return null;

	// TODO include verified in session object
	if (session.user?.verified) {
		router.replace("/");
		return null;
	}

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

Verify.getLayout = (page) => {
	return <AuthLayout>{page}</AuthLayout>;
};

export default Verify;
