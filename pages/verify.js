import Head from "next/head";
import Image from "next/image";
import VerifyForm from "../components/Auth/VerifyForm";
import { ColourLogo } from "../components/UI/Icons";

import classes from "/styles/auth.module.scss";

const Verify = () => {
	return (
		<div className={classes.authView}>
			<Head>
				<title>Verify | CreateBase</title>
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
			<div className={`${classes.authMain} ${classes.verifyMain}`}>
				<VerifyForm />
			</div>
		</div>
	);
};

Verify.authorisation = "user";

export default Verify;
