import MainLayout from "../../components/Layouts/MainLayout/MainLayout";

const ManageGroup = () => {
	return <div>Manage school page</div>;
};

ManageGroup.getLayout = function getLayout(page) {
	return <MainLayout page="manage-group">{page}</MainLayout>;
};

ManageGroup.authorisation = "admin";

export default ManageGroup;
