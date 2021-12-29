import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { PrimaryButton } from "../components/UI/Buttons";
import Img from "../components/UI/Img";
import router from "next/router";
import useApi from "../hooks/useApi";

import classes from "../styles/404.module.scss";

const Error404 = () => {
	const { reportError } = useApi();

	useEffect(() => {
		if (router.asPath === "/404") return;
		reportError({ route: router.asPath, type: "404", message: `A user is trying to access ${router.asPath} route` });
	}, []);

	return (
		<div className={classes.view}>
			<Head>
				<title>Error 404</title>
				<meta name="description" content="Oops!" />
			</Head>
			<div className={classes.container}>
				<div className={classes.heading}>
					<h1>404</h1>
					<div className={classes.img}>
						<Img src="https://raw.githubusercontent.com/CreateBaseNZ/public/dev/404.png" layout="fill" objectFit="contain" />
					</div>
				</div>
				<h2>Oops! You’ve found a magical land with polygon chickens.</h2>
				<h3>The page you’re looking for doesn’t exist or has been removed. Poof! You didn’t see anything...</h3>
			</div>
			<Link href="/" replace={true}>
				<div>
					<PrimaryButton mainLabel="Take me home" className={classes.btn} />
				</div>
			</Link>
		</div>
	);
};

export default Error404;
