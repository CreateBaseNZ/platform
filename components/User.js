import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import MyAccount from "./MyAccount/MyAccount";
import AdminConsole from "./AdminConsole/AdminConsole";

const User = ({ user, setUser, collapseHeader, setCollapseHeader }) => {
	const router = useRouter();
	const [userView, setUserView] = useState();

	useEffect(() => {
		const query = router.query.view[1];
		if (query) {
			setUserView(query);
		} else {
			if (router.query.view[0] === "user") {
				router.replace("/user/my-account");
			}
		}
	}, [router.query]);

	return (
		<div style={{ height: "100%", width: "100%", minHeight: 0 }}>
			{userView === "my-account" && <MyAccount user={user} setUser={setUser} />}
			{userView === "admin-console" && <AdminConsole user={user} setUser={setUser} collapseHeader={collapseHeader} setCollapseHeader={setCollapseHeader} />}
		</div>
	);
};

export default User;
