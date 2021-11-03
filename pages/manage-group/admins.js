import ManageGroup from "../../components/ManageGroup/ManageGroup";
import MainLayout from "../../components/Layouts/MainLayout/MainLayout";
import InnerLayout from "../../components/Layouts/InnerLayout/InnerLayout";
import { SCHOOL_TABS } from "../../constants/manageGroup";

const ManageAdmins = () => <ManageGroup role="admins" />;

ManageAdmins.getLayout = function getLayout(page) {
	return (
		<MainLayout page="manage-group">
			<InnerLayout tabs={SCHOOL_TABS} showBack={false}>
				{page}
			</InnerLayout>
		</MainLayout>
	);
};

ManageAdmins.auth = "admin";

export default ManageAdmins;
