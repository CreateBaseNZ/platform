import { useContext } from "react";
import MainLayout from "../components/Layouts/MainLayout/MainLayout";
import UserSessionContext from "../store/user-session";

const MyGroups = () => {
	const { setUserSession } = useContext(UserSessionContext);

	return (
		<div>
			<div>My Groups page</div>
			<button onClick={() => setUserSession((state) => ({ ...state, email: "hello" }))}>click</button>
		</div>
	);
};

MyGroups.getLayout = (page) => {
	return <MainLayout page="my-groups">{page}</MainLayout>;
};

MyGroups.authorisation = "user";

export default MyGroups;
