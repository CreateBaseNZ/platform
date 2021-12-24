import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { PrimaryButton } from "../components/UI/Buttons";
import Img from "../components/UI/Img";
import useApi from "../hooks/useApi";

import classes from "../styles/unsupported.module.scss";

const Unsupported = () => {
	const { reportError } = useApi();

	useEffect(() => {
		reportError({ route: "/game", type: "unsupported", message: "A user on an unsupported browser could not access our simulation", metadata: { userAgent: navigator.userAgent } });
	}, []);

	return (
		<div className={classes.view}>
			<Head>
				<title>Unsupported browser</title>
				<meta name="description" content="Oops!" />
			</Head>
			<div className={classes.img}>
				<Img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/404.png" layout="fill" objectFit="contain" />
			</div>
			<h1>Unsupported browser</h1>
			<h2>You are using a browser that does not support WebGL which is required to run our simulations.</h2>
			<h2>
				Get more information about{" "}
				<a href="https://get.webgl.org/" target="_blank" title="https://get.webgl.org/">
					WebGL here
				</a>
				.
			</h2>
			<Link href="/" replace={true}>
				<div>
					<PrimaryButton mainLabel="Back to app" className={classes.btn} />
				</div>
			</Link>
		</div>
	);
};

export default Unsupported;
