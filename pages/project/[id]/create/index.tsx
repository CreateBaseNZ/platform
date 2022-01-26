import { ReactElement, useState } from "react";
import NewProjectLayout from "../../../../components/Layouts/ProjectLayout/NewProjectLayout";
import { ALL_PROJECTS_OBJECT, ALL_PROJECTS_ARRAY } from "../../../../constants/projects";
import { TProject, TSubsystem } from "../../../../types/projects";
import ReactFlow, { Background, OnLoadFunc } from "react-flow-renderer";
import classes from "../../../../styles/create.module.scss";
import SubsystemNode from "../../../../components/Project/SubsystemNode";

const nodeTypes = {
	subsystemNode: SubsystemNode,
};

const subToEl = (subsystems: TSubsystem[]) => {
	const nodes = [];
	const edges = [];
	for (const sub of subsystems) {
		nodes.push({
			id: sub.id,
			type: "subsystemNode",
			data: {
				id: sub.id,
				title: sub.title,
				description: sub.description,
				img: sub.img,
			},
			position: sub.position,
		});
		for (const req of sub.requirements) {
			edges.push({
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
	return [...nodes, ...edges];
};

const onLoad: OnLoadFunc = (reactFlowInstance) => {
	console.log("flow loaded:", reactFlowInstance);
	reactFlowInstance.fitView();
};

interface Props {
	data: TProject;
}

const Create = ({ data }: Props) => {
	const [elements, setElements] = useState(subToEl(data.subsystems));

	return (
		<div className={classes.page}>
			<ReactFlow elements={elements} onLoad={onLoad} nodeTypes={nodeTypes} snapToGrid={true} snapGrid={[16, 16]} nodesDraggable={data.wip || false} nodesConnectable={data.wip || false}>
				<Background color="#aaa" />
			</ReactFlow>
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
