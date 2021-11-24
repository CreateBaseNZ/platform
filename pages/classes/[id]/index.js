import router from "next/router";
import MainLayout from "../../../components/Layouts/MainLayout/MainLayout";
import InnerLayout from "../../../components/Layouts/InnerLayout/InnerLayout";
import CLASSES_TABS from "../../../constants/classesConstants";

const ClassesTabRoot = () => {
	if (router.query?.id) router.replace({ pathname: "/classes/[id]/announcements", query: { id: router.query.id } });
	return null;
};

ClassesTabRoot.getLayout = function getLayout(page) {
	return (
		<MainLayout page="classes">
			<InnerLayout tabs={CLASSES_TABS} backHref="/classes">
				{page}
			</InnerLayout>
		</MainLayout>
	);
};

ClassesTabRoot.auth = "user";

export default ClassesTabRoot;
