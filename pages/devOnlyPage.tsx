import { NextPage } from "next";
import { ReactElement } from "react";
import NewProjectLayout from "../components/Layouts/ProjectLayout/NewProjectLayout";

const DevOnlyPage = () => {
	return <div>Dev only page</div>;
};

export default DevOnlyPage;

DevOnlyPage.getLayout = (page: ReactElement) => {
	return <NewProjectLayout>{page}</NewProjectLayout>;
};

export const getStaticProps = () => {
	return {
		props: {
			// returns the default 404 page with a status code of 404 in production
			notFound: process.env.NODE_ENV === "production",
		},
	};
};
