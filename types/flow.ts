import { CSSProperties } from "react";

export interface INodeData {
	values: any; // TODO
	connections: any[]; // TODO
}

export interface NodeProps {
	data: INodeData;
	id: string;
	label: string;
	isConnectable: boolean;
	style?: CSSProperties;
}

// TODO - array of possible strings, and update blocks
export type BlockList = Array<{ name: string; blocks: JSX.Element[] }>;
