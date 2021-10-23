import MainLayout from "../components/Layouts/MainLayout/MainLayout";

const MyGroups = () => {
	return <div>My Groups page</div>;
};

MyGroups.getLayout = (page) => {
	return <MainLayout page="my-groups">{page}</MainLayout>;
};

MyGroups.auth = {
	authent: "authenticated",
	authoris: "any",
};

export default MyGroups;
