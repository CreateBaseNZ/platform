import Head from "next/head";
import AuthCard from "../../components/Auth/AuthCard";
import AuthLayout from "../../components/Layouts/AuthLayout/AuthLayout";

const Signup = () => {
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
