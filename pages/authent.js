import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { ColourLogo } from "../components/UI/Icons";
import AuthentCard from "../components/Auth/AuthentCard";
import ForgotPassword from "../components/Auth/ForgotPassword";

import classes from "/styles/authent.module.scss";

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

const Authent = () => {
	const router = useRouter();
	const [authentAction, setAuthentAction] = useState("signup");

	useEffect(() => {
		setAuthentAction(router?.query?.action || "signup");
	}, [router.query.action]);

	return (
		<div className={classes.authentView}>
			<Head>
				<title>{`${setHeadTitle(authentAction)} | CreateBase`}</title>
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
			<div className={classes.authentMain}>
				{authentAction === "signup" && <AuthentCard isSignup={true} />}
				{authentAction === "login" && <AuthentCard isSignup={false} />}
				{authentAction === "forgot-password" && <ForgotPassword code={router?.query?.ocl} email={router?.query?.email} />}
			</div>
		</div>
	);
};

Authent.auth = {
	authent: false,
	authoris: "none",
};

export default Authent;
