import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { useSession } from "next-auth/client";
import { ColourLogo } from "../../components/UI/Icons";
import { LoginForm } from "../../components/Auth/LoginForm";
import Img from "../../components/UI/Img";
import SignupForm from "../../components/Auth/SignupForm";

import classes from "/styles/authView.module.scss";

const Auth = ({ setLoaded }) => {
	const router = useRouter();
	const [session, loading] = useSession();
	const [isSignup, setIsSignup] = useState(true);

	useEffect(() => {
		if (session) {
			router.replace("/browse");
		} else {
			if (window.localStorage.getItem("createbase__remember-me")) {
				setIsSignup(false);
			}
			setLoaded(true);
		}
		return () => setLoaded(false);
	}, []);

	useEffect(() => {
		if (Object.keys(router.query).length) {
			const query = router.query.authView;
			if (query) {
				setIsSignup(query[0] === "signup");
			} else {
				setIsSignup(true);
			}
		}
	}, [router.query]);

	if (loading) return null;

	return (
		<div className={classes.authView}>
			<Head>
				<title>{isSignup ? "Sign Up" : "Log In"} | CreateBase</title>
				<meta name="description" content="Log into your CreateBase account" />
			</Head>
			<div className={classes.squiggle}>
				<Image src="/auth/squiggle-thin.svg" layout="fill" objectFit="contain" />
			</div>
			<div className={`${classes.squiggle} ${classes.squiggle2}`}>
				<Image src="/auth/squiggle-thin.svg" layout="fill" objectFit="contain" />
			</div>
			<div className={classes.triangle} />
			<p className={classes.copy}>&copy; CreateBase 2021</p>
			<div className={classes.logo}>
				<ColourLogo />
			</div>
			<div className={classes.auth}>
				<div className={`${classes.imgContainer} ${isSignup ? classes.signup : classes.login}`}>
					<div className={classes.imgWrapper}>
						<Image src="/auth/turtle.svg" layout="fill" objectFit="cover" />
						<div style={{ marginLeft: "-10%", height: "100%", width: "140%" }}>
							<Img
								src={isSignup ? "/auth/signup.svg" : "/auth/login.svg"}
								layout="fill"
								objectFit="contain"
								style={{ transform: isSignup ? "rotate(-45deg) scaleX(-1) translate(-2%, -8%)" : "scaleX(-1)" }}
							/>
						</div>
					</div>
				</div>
				<div className={`${classes.formContainer} roundScrollbar`}>{isSignup ? <SignupForm setIsSignup={setIsSignup} /> : <LoginForm setIsSignup={setIsSignup} />}</div>
			</div>
		</div>
	);
};

export default Auth;
