import { useState } from "react";
import ReactFlow, { Background, Edge, MiniMap, Node, OnLoadFunc, useStoreState } from "react-flow-renderer";
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
	reactFlowInstance.fitView({ padding: 0.25 });
};

interface Props {
	data: TProject;
}

const SubsystemsFlow = ({ data }: Props): JSX.Element => {
	const [helpShown, setHelpShown] = useState(false);
	const [elements, setElements] = useState(subToEl(data.subsystems));
	const nodes = useStoreState((store) => store.nodes);

	const printPositions = () => {
		console.log(nodes.map((node) => ({ id: node.id, x: node.__rf.position.x.toFixed(2), y: node.__rf.position.y.toFixed(2) })));
	};

	return (
		<>
			<ReactFlow
				elements={elements}
				onLoad={onLoad}
				nodeTypes={nodeTypes}
				snapToGrid={true}
				snapGrid={[32, 32]}
				nodesDraggable={data.wip || false}
				nodesConnectable={data.wip || false}
				elementsSelectable={data.wip || false}>
				<Background color="#cccccc" gap={32} size={1} />
				<MiniMap
					nodeColor={(node) => {
						switch (node.type) {
							case "ongoing":
								return "#fdb554";
							case "complete":
								return "#18dbac";
							default:
								return "#ededed";
						}
					}}
					nodeStrokeWidth={0}
					nodeBorderRadius={16}
					className={classes.minimap}
				/>
			</ReactFlow>
			{data.wip && (
				<button className={classes.wipBtn} onClick={printPositions}>
					Print positions
				</button>
			)}
			<button className={`${classes.help} ${helpShown ? classes.active : ""}`} title="Help" onClick={() => setHelpShown((state) => !state)}>
				<i className="material-icons-outlined">help_outline</i>
			</button>
			{helpShown && (
				<div className={classes.tooltip}>
					<button className={classes.tooltipClose} title="Close" onClick={() => setHelpShown(false)}>
						<i className="material-icons-outlined">close</i>
					</button>
					<h5 className={classes.tooltipHeader}>What&apos;s this?</h5>
					<p>Welcome to the Create step! Each card here represents a subsystem and is linked by its requirements.</p>
					<p>Connections can be three colours:</p>
					<ul>
						<li>
							<span style={{ color: "#cecece" }}>Grey</span> - incomplete requirement
						</li>
						<li>
							<span style={{ color: "#fdb554" }}>Amber</span> - requirement in progress
						</li>
						<li>
							<span style={{ color: "#18dbac" }}>Green</span> - requirement completed
						</li>
					</ul>
					<p>Click on a card to get started.</p>
				</div>
			)}
		</>
	);
};

export default SubsystemsFlow;
