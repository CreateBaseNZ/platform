import MainLayout from "../../components/Layouts/MainLayout/MainLayout";

const ManageSchool = () => {
	return <div>Manage school page</div>;
};

ManageSchool.getLayout = function getLayout(page) {
	return <MainLayout page="manage-school">{page}</MainLayout>;
};

ManageSchool.auth = {
	authent: "authenticated",
	authoris: "admin",
};

export default ManageSchool;
