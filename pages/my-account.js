import MainLayout from "../components/Layouts/MainLayout/MainLayout";

const MyAccount = () => {
	return <div>My Groups page</div>;
};

MyAccount.getLayout = function getLayout(page) {
	return <MainLayout page="classes">{page}</MainLayout>;
};

export default MyAccount;
