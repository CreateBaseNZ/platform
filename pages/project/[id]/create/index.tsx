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
	const nHandleOuts: Record<string, string[]> = {};
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
				requirements: sub.requirements,
			},
			position: sub.position,
		});

		if (!nHandleOuts[sub.id]) nHandleOuts[sub.id] = [];

		for (const req of sub.requirements) {
			edges.push({
				id: `${req}_${sub.id}`,
				source: req,
				sourceHandle: `${req}_${sub.id}`,
				target: sub.id,
				targetHandle: `${sub.id}_${req}`,
				animated: true,
				style: {
					stroke: "#CECECE",
					strokeWidth: 2,
					strokeDashArray: "32, 64",
				},
				type: "smoothstep",
			});
			nHandleOuts[req] ? nHandleOuts[req].push(sub.id) : (nHandleOuts[req] = [sub.id]);
		}
	}
	return [...nodes.map((node) => ({ ...node, data: { ...node.data, requiredBy: nHandleOuts[node.id] } })), ...edges];
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

	// TODO - @louis set nodesDraggable default to false
	return (
		<div className={classes.page}>
			<ReactFlow elements={elements} onLoad={onLoad} nodeTypes={nodeTypes} snapToGrid={true} snapGrid={[32, 32]} nodesDraggable={data.wip || true} nodesConnectable={data.wip || false}>
				<Background color="#aaa" gap={32} size={1} />
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
