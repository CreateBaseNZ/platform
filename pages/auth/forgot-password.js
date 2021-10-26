import { useRouter } from "next/router";
import Head from "next/head";
import ForgotPasswordForm from "../../components/Auth/ForgotPasswordForm";
import AuthLayout from "../../components/Layouts/AuthLayout/AuthLayout";

const ForgotPassword = () => {
	const router = useRouter();

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
