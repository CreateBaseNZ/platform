import MainLayout from "../components/Layouts/MainLayout/MainLayout";

const MyGroups = () => {
	return <div>My Groups page</div>;
};

MyGroups.getLayout = (page) => {
	return (
		<MainLayout page="my-groups" auth="student">
			{page}
		</MainLayout>
	);
};

export default MyGroups;
