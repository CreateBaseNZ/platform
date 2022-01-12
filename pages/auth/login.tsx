import { ReactElement, useContext, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import AuthCard from "../../components/Auth/AuthCard";
import AuthLayout from "../../components/Layouts/AuthLayout/AuthLayout";
import GlobalSessionContext from "../../store/global-session-context";

const Login = (): JSX.Element | null => {
	const router = useRouter();
	const { loaded, globalSession } = useContext(GlobalSessionContext);

	useEffect(() => {
		if (loaded && globalSession.accountId) return void router.replace("/");
	}, [loaded, globalSession]);

	if (!loaded || globalSession.accountId) return null;

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
