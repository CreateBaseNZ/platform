import Head from "next/head";
import AuthCard from "../../components/Auth/AuthCard";
import AuthLayout from "../../components/Layouts/AuthLayout/AuthLayout";

const Login = () => {
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
