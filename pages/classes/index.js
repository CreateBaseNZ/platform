import MainLayout from "../../components/Layouts/MainLayout/MainLayout";

const Classes = () => {
	return <div>Class page</div>;
};

Classes.getLayout = (page) => {
	return <MainLayout page="classes">{page}</MainLayout>;
};

export default Classes;
