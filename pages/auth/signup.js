import { useContext, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import GlobalSessionContext from "../../store/global-session-context";
import AuthCard from "../../components/Auth/AuthCard";
import AuthLayout from "../../components/Layouts/AuthLayout/AuthLayout";

const Signup = () => {
	const router = useRouter();
	const { loaded, globalSession } = useContext(GlobalSessionContext);

	useEffect(() => {
		if (loaded && globalSession.accountId) router.replace("/");
	}, [globalSession]);

	if (!loaded || globalSession.accountId) return null;

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

Signup.getLayout = (page) => {
	return <AuthLayout>{page}</AuthLayout>;
};

export default Signup;
