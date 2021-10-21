import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ColourLogo } from "../components/UI/Icons";
import AuthCard from "../components/Auth/AuthCard";
import ForgotPassword from "../components/Auth/ForgotPassword";

import classes from "/styles/authView.module.scss";

const setHeadTitle = (action) => {
	switch (action) {
		case "login":
			return "Log In";
		case "signup":
			return "Sign Up";
		case "forgot-password":
			return "Forgot Password";
		default:
			return "";
	}
};

const Auth = () => {
	const router = useRouter();
	const { data: session, status: sessionStatus } = useSession();
	const [authAction, setAuthAction] = useState("signup");

	console.log(authAction);

	useEffect(() => {
		if (sessionStatus !== "loading") {
			setAuthAction(router?.query?.action || "signup");
		}
	}, [sessionStatus, router.query.action]);

	if (sessionStatus === "loading") return null;

	if (session) {
		router.replace("/");
		return null;
	}

	return (
		<div className={classes.authView}>
			<Head>
				<title>{`${setHeadTitle(authAction)} | CreateBase`}</title>
				<meta name="description" content="Log into your CreateBase account" />
			</Head>
			<div className={classes.squiggle}>
				<div>
					<Image src="/auth/squiggle-thin.svg" layout="fill" objectFit="contain" />
				</div>
			</div>
			<div className={`${classes.squiggle} ${classes.squiggle2}`}>
				<div>
					<Image src="/auth/squiggle-thin.svg" layout="fill" objectFit="contain" />
				</div>
			</div>
			<div className={classes.triangle} />
			<p className={classes.copy}>&copy; CreateBase 2021</p>
			<div className={classes.logo}>
				<ColourLogo />
			</div>
			<div className={classes.authMain}>
				{authAction === "signup" && <AuthCard isSignup={true} />}
				{authAction === "login" && <AuthCard isSignup={false} />}
				{authAction === "forgot-password" && <ForgotPassword code={router?.query?.ocl} email={router?.query?.email} />}
			</div>
		</div>
	);
};

export default Auth;
