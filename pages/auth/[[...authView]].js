import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import Image from "next/image";
import { ColourLogo } from "../../components/UI/Icons";
import AuthForm from "../../components/Auth/AuthForm";
import ResetPassword from "../../components/Auth/ResetPassword";

import classes from "/styles/authView.module.scss";

const Auth = ({ setLoaded }) => {
	const router = useRouter();
	const [session, loading] = useSession();
	const [view, setView] = useState("");

	console.log(view);

	useEffect(() => {
		return () => setLoaded(false);
	}, []);

	useEffect(() => {
		if (!loading && session) {
			router.replace("/browse");
		} else {
			setLoaded(true);
		}
	}, [loading]);

	useEffect(() => {
		if (Object.keys(router.query).length) {
			setView(router.query.authView[0]);
		} else {
			if (window.localStorage.getItem("createbase__remember-me")) {
				setView("login");
			} else {
				setView("signup");
			}
		}
	}, [router.query]);

	if (loading) return null;

	return (
		<div className={classes.authView}>
			<Head>
				<title>
					{view &&
						view
							.split("-")
							.map((w) => w[0].toUpperCase() + w.substring(1))
							.join(" ")}{" "}
					| CreateBase
				</title>
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
				{view === "signup" && <AuthForm isSignup={true} />}
				{view === "login" && <AuthForm isSignup={false} />}
				{view === "recover" && <ResetPassword />}
			</div>
		</div>
	);
};

export default Auth;
