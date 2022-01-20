import { ReactElement } from "react";
import MainLayout from "../components/Layouts/MainLayout/MainLayout";

const Test = () => {
	return <div>Hello</div>;
};

Test.getLayout = (page: ReactElement) => {
	return <MainLayout page="onboarding">{page}</MainLayout>;
};

Test.auth = "any";

export default Test;
