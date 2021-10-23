import MainLayout from "../../../components/Layouts/MainLayout/MainLayout";
import InnerLayout from "../../../components/Layouts/InnerLayout/InnerLayout";
import CLASSES_TABS from "../../../constants/classesTabs";

const ClassesTab = () => {
	return <div>Classtab</div>;
};

ClassesTab.getLayout = (page) => {
	return (
		<MainLayout page="classes">
			<InnerLayout tabs={CLASSES_TABS}>{page}</InnerLayout>
		</MainLayout>
	);
};

export default ClassesTab;
