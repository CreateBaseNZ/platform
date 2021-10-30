import { useRouter } from "next/router";
import Head from "next/head";
import ForgotPasswordForm from "../../components/Auth/ForgotPasswordForm";
import AuthLayout from "../../components/Layouts/AuthLayout/AuthLayout";
import { useSession } from "next-auth/react";

const ForgotPassword = () => {
	const router = useRouter();
	const { data: session, status } = useSession();

	if (status === "loading") return null;

	if (session) return router.replace("/");

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
