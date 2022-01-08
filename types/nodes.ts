import { CSSProperties } from "react";

export interface NodeData {
	values: any; // TODO
	connections: any[]; // TODO
}

export interface AimbotSensingProps {
	data?: NodeData;
	isConnectable?: boolean;
}

export interface AimbotActionProps {
	id?: string;
	data?: NodeData;
	isConnectable?: boolean;
}

export interface NodeProps {
	data: NodeData;
	id: string;
	label: string;
	isConnectable: boolean;
	style?: CSSProperties;
}
