import { useState } from "react";
import ReactFlow, { Background, Edge, Node, OnLoadFunc, useStoreState } from "react-flow-renderer";
import { TSubsystemNodeData } from "../../types/flow";
import { TProject, TSubsystem } from "../../types/projects";
import SubsystemNode from "./SubsystemNode";

import classes from "./SubsystemsFlow.module.scss";

const nodeTypes = {
	subsystemNode: SubsystemNode,
};

const subToEl = (subsystems: TSubsystem[]): Array<Node<TSubsystemNodeData> | Edge> => {
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

const SubsystemsFlow = ({ data }: Props): JSX.Element => {
	const [elements, setElements] = useState(subToEl(data.subsystems));
	const nodes = useStoreState((store) => store.nodes);

	const printPositions = () => {
		console.log(nodes.map((node) => ({ id: node.id, x: node.__rf.position.x.toFixed(2), y: node.__rf.position.y.toFixed(2) })));
	};

	return (
		<>
			<ReactFlow elements={elements} onLoad={onLoad} nodeTypes={nodeTypes} snapToGrid={true} snapGrid={[32, 32]} nodesDraggable={data.wip || true} nodesConnectable={data.wip || false}>
				<Background color="#aaa" gap={32} size={1} />
			</ReactFlow>
			{data.wip && (
				<button className={classes.wipBtn} onClick={printPositions}>
					Print positions
				</button>
			)}
		</>
	);
};

export default SubsystemsFlow;
