import { useContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import AuthCard from "../../components/Auth/AuthCard";
import AuthLayout from "../../components/Layouts/AuthLayout/AuthLayout";
import GlobalSessionContext from "../../store/global-session-context";

const Login = () => {
	const router = useRouter();
	const { globalSession } = useContext(GlobalSessionContext);

	// useEffect(() => {
	// 	if (globalSession.loaded && globalSession.email) router.replace("/");
	// }, [globalSession]);

	// if (!globalSession.loaded || globalSession.email) return null;

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

Login.getLayout = (page) => {
	return <AuthLayout>{page}</AuthLayout>;
};

export default Login;
