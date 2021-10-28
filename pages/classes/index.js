import Head from "next/head";
import { useContext } from "react";
import MainLayout from "../../components/Layouts/MainLayout/MainLayout";
import UserSessionContext from "../../store/user-session";

const Classes = () => {
	const { userSession } = useContext(UserSessionContext);

	return (
		<div>
			<Head>
				<title>Classes • {userSession.recentGroups[0].name} | CreateBase</title>
				<meta name="description" content={`View your classes in ${userSession.recentGroups[0].name}. CreateBase`} />
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
