import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import VerifyForm from "../../components/Auth/VerifyForm";
import AuthLayout from "../../components/Layouts/AuthLayout/AuthLayout";
import GlobalSessionContext from "../../store/global-session-context";

import classes from "/styles/auth.module.scss";

const Verify = () => {
	const router = useRouter();
	const { globalSession } = useContext(GlobalSessionContext);

	useEffect(() => {
		if (globalSession.loaded && globalSession.verified) router.replace("/");
	}, [globalSession]);

	if (!globalSession.loaded || globalSession.verified) return null;

	return (
		<>
			<Head>
				<title>Verify | CreateBase</title>
				<meta name="description" content="Verify your CreateBase account" />
			</Head>
			<VerifyForm />
		</>
	);
};

Verify.getLayout = (page) => {
	return <AuthLayout>{page}</AuthLayout>;
};

export default Verify;
