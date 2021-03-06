import { ReactElement, useContext, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import GlobalSessionContext from "../../store/global-session-context";
import AuthCard from "../../components/Auth/AuthCard";
import AuthLayout from "../../components/Layouts/AuthLayout/AuthLayout";

const Signup = (): JSX.Element | null => {
	const router = useRouter();
	const { globalSession } = useContext(GlobalSessionContext);

	useEffect(() => {
		if (globalSession.loaded && globalSession.accountId) return void router.replace((router.query.callbackUrl as string) || "/");
	}, [globalSession, router]);

	if (!globalSession.loaded || globalSession.accountId) return null;

	return (
		<>
			<Head>
				<title>Sign Up | CreateBase</title>
				<meta name="description" content="Log into your CreateBase account" />
			</Head>
			<AuthCard isSignup={true} />
		</>
	);
};

Signup.getLayout = (page: ReactElement) => {
	return <AuthLayout>{page}</AuthLayout>;
};

export default Signup;
