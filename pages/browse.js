import Link from "next/link";
import MainLayout from "../components/Layouts/MainLayout/MainLayout";

const Browse = () => {
	return (
		<div>
			<div>Browse page</div>
			<Link href={{ pathname: "/auth", query: { action: "login" } }}>to login</Link>
		</div>
	);
};

Browse.getLayout = function getLayout(page) {
	return <MainLayout page="browse">{page}</MainLayout>;
};

export default Browse;
