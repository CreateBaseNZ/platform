import MainLayout from "../components/Layouts/MainLayout/MainLayout";

const MyGroups = () => {
	return <div>My Groups page</div>;
};

MyGroups.getLayout = function getLayout(page) {
	return <MainLayout page="classes">{page}</MainLayout>;
};

export default MyGroups;
