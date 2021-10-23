import MainLayout from "../../../components/Layouts/MainLayout/MainLayout";
import InnerLayout from "../../../components/Layouts/InnerLayout/InnerLayout";
import MANAGE_SCHOOL_TABS from "../../../constants/manageSchoolTabs";

const ManageSchoolTab = () => {
	return <div>Manage school tab</div>;
};

ManageSchoolTab.getLayout = (page) => {
	return (
		<MainLayout page="classes">
			<InnerLayout tabs={MANAGE_SCHOOL_TABS} showBack={false}>
				{page}
			</InnerLayout>
		</MainLayout>
	);
};

export default ManageSchoolTab;
