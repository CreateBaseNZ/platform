import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import AuthCard from "../../components/Auth/AuthCard";
import AuthLayout from "../../components/Layouts/AuthLayout/AuthLayout";

const Signup = () => {
	const router = useRouter();
	const { data: session, status } = useSession();

	if (status === "loading") return null;

	if (session) return router.replace("/");

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
