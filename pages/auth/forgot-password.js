import { useEffect, useContext } from "react";
import Head from "next/head";
import GlobalSessionContext from "../../store/global-session-context";
import ForgotPasswordForm from "../../components/Auth/ForgotPasswordForm";
import AuthLayout from "../../components/Layouts/AuthLayout/AuthLayout";
import router from "next/router";

const ForgotPassword = () => {
	const { globalSession } = useContext(GlobalSessionContext);

	useEffect(() => {
		if (globalSession.loaded && globalSession.accountId) router.replace("/");
	}, [globalSession]);

	if (!globalSession.loaded || globalSession.accountId) return null;

	return (
		<>
			<Head>
				<title>Forgot Password | CreateBase</title>
				<meta name="description" content="Log into your CreateBase account" />
			</Head>
			<ForgotPasswordForm />
		</>
	);
};

ForgotPassword.getLayout = (page) => {
	return <AuthLayout>{page}</AuthLayout>;
};

export default ForgotPassword;
