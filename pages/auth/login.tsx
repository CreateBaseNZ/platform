import { ReactElement, useContext, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import AuthCard from "../../components/Auth/AuthCard";
import AuthLayout from "../../components/Layouts/AuthLayout/AuthLayout";
import GlobalSessionContext from "../../store/global-session-context";

const Login = (): JSX.Element | null => {
	const router = useRouter();
	const { globalSession } = useContext(GlobalSessionContext);

	useEffect(() => {
		if (globalSession.loaded && globalSession.accountId) return void router.replace((router.query.callbackUrl as string) || "/");
	}, [globalSession, router]);

	if (!globalSession.loaded || globalSession.accountId) return null;

	return (
		<>
			<Head>
				<title>Log In | CreateBase</title>
				<meta name="description" content="Log into your CreateBase account" />
			</Head>
			<AuthCard isSignup={false} />
		</>
	);
};

Login.getLayout = (page: ReactElement) => {
	return <AuthLayout>{page}</AuthLayout>;
};

export default Login;
