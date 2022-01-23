import Head from "next/head";
import router from "next/router";
import Link from "next/link";
import useApi from "../hooks/useApi";
import Img from "../components/UI/Img";
import { PrimaryButton } from "../components/UI/Buttons";

import classes from "../styles/404.module.scss";
import { NextPage, NextPageContext } from "next";

interface IErrorProps {
	statusCode?: string;
}

const Error = ({ statusCode }: IErrorProps): JSX.Element => {
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
						<Img src="https://raw.githubusercontent.com/CreateBaseNZ/public/dev/404.png" layout="fill" objectFit="contain" />
					</div>
				</div>
				<h2>Oops! You’ve found a magical land with polygon chickens.</h2>
				<h3>{statusCode ? `A server-side ${statusCode} error occurred` : "A client-side error occurred"}, we're doing our best to resolve it. Sorry for the inconvenience!</h3>
			</div>
			<Link href="/" replace={true}>
				<a>
					<PrimaryButton mainLabel="Take me home" className={classes.btn} />
				</a>
			</Link>
		</div>
	);
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
	const { reportError } = useApi();
	reportError(router.asPath, "runtime", err?.toString());

	const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
	return { statusCode };
};

export default Error;
