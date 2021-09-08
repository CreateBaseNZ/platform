import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import MyAccount from "./MyAccount/MyAccount";

const User = ({ user, setUser }) => {
	const router = useRouter();
	const [userView, setUserView] = useState();

	useEffect(() => {
		const query = router.query.view[1];
		console.log(router.query);
		if (query) {
			setUserView(query);
		} else {
			if (router.query.view[0] === "user") {
				router.replace("/user/my-account");
			}
		}
	}, [router.query]);

	return <div style={{ height: "100%", width: "100%" }}>{userView === "my-account" && <MyAccount user={user} setUser={setUser} />}</div>;
};

export default User;
