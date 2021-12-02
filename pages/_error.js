import Head from "next/head";
import router from "next/router";
import Link from "next/link";
import useApi from "../hooks/useApi";
import Img from "../components/UI/Img";
import { PrimaryButton } from "../components/UI/Buttons";

import classes from "../styles/404.module.scss";

const Error = ({ statusCode }) => {
	return (
		<div className={classes.view}>
			<Head>
				<title>Error {statusCode}</title>
				<meta name="description" content="Oops!" />
			</Head>
			<div className={classes.container}>
				<div className={classes.heading}>
					<h1>{statusCode || "Error"}</h1>
					<div className={classes.img}>
						<Img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/404.png" layout="fill" objectFit="contain" />
					</div>
				</div>
				<h2>Oops! You’ve found a magical land with polygon chickens.</h2>
				<h3>{statusCode ? `A server-side ${statusCode} error occurred` : "A client-side error occurred"}, we're doing our best to resolve it. Sorry for the inconvenience!</h3>
			</div>
			<Link href="/" replace={true}>
				<div>
					<PrimaryButton mainLabel="Take me home" className={classes.btn} />
				</div>
			</Link>
		</div>
	);
};

Error.getInitialProps = ({ res, err }) => {
	const { reportError } = useApi();
	reportError({ route: router.router, type: "runtime", message: err.toString() });

	const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
	return { statusCode };
};

export default Error;
