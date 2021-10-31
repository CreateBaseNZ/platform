import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useSession } from "next-auth/react";
import ForgotPasswordForm from "../../components/Auth/ForgotPasswordForm";
import AuthLayout from "../../components/Layouts/AuthLayout/AuthLayout";

const ForgotPassword = () => {
	const router = useRouter();
	const { data: session, status } = useSession();

	useEffect(() => {
		if (status !== "loading" && session) router.replace("/");
	}, [session, status]);

	if (status === "loading" || session) return null;

	return (
		<>
			<Head>
				<title>Forgot Password | CreateBase</title>
				<meta name="description" content="Log into your CreateBase account" />
			</Head>
			<ForgotPasswordForm code={router?.query?.ocl} email={router?.query?.email} />
		</>
	);
};

ForgotPassword.getLayout = (page) => {
	return <AuthLayout>{page}</AuthLayout>;
};

export default ForgotPassword;
