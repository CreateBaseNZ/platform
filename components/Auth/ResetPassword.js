import router from "next/router";
import { useEffect } from "react";

const ResetPassword = () => {
	const [user, setUser] = useState();

	useEffect(() => {
		if (router.query.authView.length > 1) {
			setUser(router.query.authView[1]);
			setUser(router.query.authView[2]);
		}
	}, []);

	console.log(router.query.authView);
	router.replace("");
	return <div></div>;
};

export default ResetPassword;
