import { useEffect, useState } from "react";
import router from "next/router";

import classes from "./AuthForms.module.scss";

const ResetPassword = () => {
	const [inputs, setInputs] = useState({});

	useEffect(() => {
		if (router.query.authView.length > 1) {
			setInputs({ email: router.query.authView[1], code: router.query.authView[2] });
		}
	}, []);

	console.log(router.query.authView);
	return (
		<div>
			<form className={classes.form}></form>
		</div>
	);
};

export default ResetPassword;
