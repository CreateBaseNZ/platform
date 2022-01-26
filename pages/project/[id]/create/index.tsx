import { ReactElement, useState } from "react";
import NewProjectLayout from "../../../../components/Layouts/ProjectLayout/NewProjectLayout";
import { ALL_PROJECTS_OBJECT, ALL_PROJECTS_ARRAY } from "../../../../constants/projects";
import { TProject, TSubsystem } from "../../../../types/projects";
import ReactFlow from "react-flow-renderer";
import classes from "../../../../styles/create.module.scss";

interface Props {
	data: TProject;
}

const subToEl = (subsystems: TSubsystem[]) => {
	const els = [];
	for (const sub of subsystems) {
		els.push({
			id: sub.id,
			data: {
				id: sub.id,
				title: sub.title,
				description: sub.description,
				img: sub.img,
			},
			position: sub.position,
		});
		for (const req of sub.requirements) {
			els.push({
				id: `${req}-${sub.id}`,
				source: req,
				target: sub.id,
				animated: true,
				style: {
					stroke: "#CECECE",
				},
			});
		}
	}
	return els;
};

const Create = ({ data }: Props) => {
	const [elements, setElements] = useState(subToEl(data.subsystems));

	return (
		<div className={classes.page}>
			<ReactFlow elements={elements}></ReactFlow>
		</div>
	);
};

Create.getLayout = (page: ReactElement, pageProps: any) => {
	return (
		<NewProjectLayout step="Create" data={pageProps.data}>
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
