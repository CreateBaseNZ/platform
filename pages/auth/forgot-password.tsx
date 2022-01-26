import { useEffect, useContext, ReactElement } from "react";
import Head from "next/head";
import GlobalSessionContext from "../../store/global-session-context";
import ForgotPasswordForm from "../../components/Auth/ForgotPasswordForm";
import AuthLayout from "../../components/Layouts/AuthLayout/AuthLayout";
import router from "next/router";

const ForgotPassword = (): JSX.Element | null => {
	const { globalSession } = useContext(GlobalSessionContext);

	useEffect(() => {
		if (globalSession.loaded && globalSession.accountId) return void router.replace((router.query.callbackUrl as string) || "/");
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

ForgotPassword.getLayout = (page: ReactElement) => {
	return <AuthLayout>{page}</AuthLayout>;
};

export default ForgotPassword;
