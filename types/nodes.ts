import { CSSProperties } from "react";

export interface INodeData {
	values: any; // TODO
	connections: any[]; // TODO
}

export interface AimbotSensingProps {
	data?: INodeData;
	isConnectable?: boolean;
}

export interface AimbotActionProps {
	id?: string;
	data?: INodeData;
	isConnectable?: boolean;
}

export interface NodeProps {
	data: INodeData;
	id: string;
	label: string;
	isConnectable: boolean;
	style?: CSSProperties;
}
