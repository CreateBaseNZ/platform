import { CSSProperties } from "react";

// TODO - @louis phase this out
export interface INodeData {
	values: any; // TODO
	connections: any[]; // TODO
}

// TODO - @louis phase this out
export interface NodeProps {
	data: INodeData;
	id: string;
	label: string;
	isConnectable: boolean;
	style?: CSSProperties;
}

// TODO - @louis phase this out
export type BlockList = Array<{ name: string; blocks: JSX.Element[] }>;

export type TSubsystemNode = {
	id: string;
	title: string;
	description: string;
	img: string;
	requirements: string[];
	requiredBy: string[];
};
