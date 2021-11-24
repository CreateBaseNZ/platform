import router from "next/router";
import MainLayout from "../../components/Layouts/MainLayout/MainLayout";
import MyAccountLayout from "../../components/Layouts/MyAccountLayout/MyAccountLayout";

const MyAccount = () => {
	router.replace("/my-account/profile");
	return null;
};

MyAccount.getLayout = (page) => {
	return (
		<MainLayout page="my-account">
			<MyAccountLayout name="">{page}</MyAccountLayout>
		</MainLayout>
	);
};

MyAccount.auth = "user";

export default MyAccount;
