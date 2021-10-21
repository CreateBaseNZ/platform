import MainLayout from "../components/Layouts/MainLayout/MainLayout";
import Link from "next/link";

const Support = () => {
	return (
		<div>
			<div>Support page</div>
			<Link href="/browse">to browse</Link>
		</div>
	);
};

Support.getLayout = function getLayout(page) {
	return <MainLayout page="support">{page}</MainLayout>;
};

export default Support;
