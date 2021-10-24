import MainLayout from "../../../components/Layouts/MainLayout/MainLayout";
import InnerLayout from "../../../components/Layouts/InnerLayout/InnerLayout";
import { MANAGE_SCHOOL_TABS, MANAGE_FAMILY_TABS } from "../../../constants/manageGroupTabs";

const ManageGroup = () => {
	return <div>Manage school tab</div>;
};

ManageGroup.getLayout = (page) => {
	return (
		<MainLayout page="classes">
			<InnerLayout tabs={MANAGE_SCHOOL_TABS} showBack={false}>
				{page}
			</InnerLayout>
		</MainLayout>
	);
};

ManageGroup.authorisation = "admin";

export default ManageGroup;
