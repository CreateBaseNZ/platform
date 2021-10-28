import MainLayout from "../../../components/Layouts/MainLayout/MainLayout";
import InnerLayout from "../../../components/Layouts/InnerLayout/InnerLayout";
import CLASSES_TABS from "../../../constants/classesTabs";

const ClassesTabRoot = () => {
	return <div>Classtab</div>;
};

ClassesTabRoot.getLayout = (page) => {
	return (
		<MainLayout page="classes">
			<InnerLayout tabs={CLASSES_TABS}>{page}</InnerLayout>
		</MainLayout>
	);
};

ClassesTabRoot.authorisation = "user";

export default ClassesTabRoot;
