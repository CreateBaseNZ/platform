import MainLayout from "../components/Layouts/MainLayout/MainLayout";

const MyAccount = () => {
	return <div>My Groups page</div>;
};

MyAccount.getLayout = (page) => {
	return <MainLayout page="my-account">{page}</MainLayout>;
};

MyAccount.authorisation = "user";

export default MyAccount;
