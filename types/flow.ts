import { CSSProperties, Dispatch, SetStateAction } from "react";
import { Node } from "react-flow-renderer";
import { TSubsystem } from "./projects";

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

// TODO - @louis comment this
export type TSubsystemNodeData = {
	id: string;
	title: string;
	description: string;
	img: string;
	requirements: string[];
	requiredBy: string[];
	setPreview: Dispatch<SetStateAction<TNodePreview | null>>;
};

// TODO - @louis comment this
export type TNodePreview = {
	title: string;
	description: string;
	img: string;
	requirements: string[];
};
