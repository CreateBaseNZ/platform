import { ReactElement } from "react";
import NewProjectLayout from "../../../../components/Layouts/ProjectLayout/NewProjectLayout";
import { ALL_PROJECTS_OBJECT, ALL_PROJECTS_ARRAY } from "../../../../constants/projects";
import { IProjectReadOnly } from "../../../../types/projects";
import classes from "../../../../styles/create.module.scss";

interface Props {
	data: IProjectReadOnly;
}

const Create = ({ data }: Props) => {
	return <div className={classes.page}></div>;
};

Create.getLayout = (page: ReactElement, pageProps: any) => {
	return (
		<NewProjectLayout step="Create" isFlat={true} data={pageProps.data}>
			{page}
		</NewProjectLayout>
	);
};

Create.auth = "user";

export default Create;

interface Params {
	params: {
		id: string;
	};
}

export async function getStaticProps({ params }: Params) {
	return {
		props: {
			data: ALL_PROJECTS_OBJECT[params.id],
		},
	};
}

export async function getStaticPaths() {
	return {
		paths: ALL_PROJECTS_ARRAY.map((project) => {
			return {
				params: {
					id: project.id,
				},
			};
		}),
		fallback: false,
	};
}
