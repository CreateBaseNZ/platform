import MainLayout from "../../components/Layouts/MainLayout/MainLayout";

const Classes = () => {
	return <div>Class page</div>;
};

Classes.getLayout = (page) => {
	return <MainLayout page="classes">{page}</MainLayout>;
};

Classes.auth = {
	authent: "authenticated",
	authoris: "any",
};

export default Classes;
