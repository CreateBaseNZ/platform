import Head from "next/head";
import { useContext } from "react";
import MainLayout from "../../components/Layouts/MainLayout/MainLayout";
import UserSessionContext from "../../store/user-session";

const Classes = () => {
	const { userSession } = useContext(UserSessionContext);

	return (
		<div>
			<Head>
				<title>Classes • {userSession.view.groupName} | CreateBase</title>
				<meta name="description" content={`View your classes in ${userSession.view.groupName}. CreateBase`} />
			</Head>
			Class page
		</div>
	);
};

Classes.getLayout = (page) => {
	return <MainLayout page="classes">{page}</MainLayout>;
};

Classes.authorisation = "user";

export default Classes;
