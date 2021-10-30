import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import AuthCard from "../../components/Auth/AuthCard";
import AuthLayout from "../../components/Layouts/AuthLayout/AuthLayout";

const Login = () => {
	const router = useRouter();
	const { data: session, status } = useSession();

	if (status === "loading") return null;

	if (session) return router.replace("/");

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
