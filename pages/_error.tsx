import { useEffect } from "react";
import { NextPageContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import useApi from "../hooks/useApi";
import Img from "../components/UI/Img";
import { PrimaryButton } from "../components/UI/Buttons";

import classes from "../styles/404.module.scss";

interface Props {
	statusCode?: string;
	err?:
		| (Error & {
				statusCode?: number | undefined;
		  })
		| null
		| undefined;
}

const Error = ({ statusCode, err }: Props): JSX.Element => {
	const router = useRouter();
	const { reportError } = useApi();

	useEffect(() => {
		if (!router.isReady) return;
		reportError(router.asPath, "runtime", err?.toString());
	}, [reportError, router, err]);

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
				<h2>Oops! You&apos;ve found a magical land with polygon chickens.</h2>
				<h3>{statusCode ? `A server-side ${statusCode} error occurred` : "A client-side error occurred"}, we&apos;re doing our best to resolve it. Sorry for the inconvenience!</h3>
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
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
	return { statusCode, err };
};

export default Error;
