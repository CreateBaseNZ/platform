import { memo, ReactElement } from "react";
import Image from "next/image";
import { Handle, Position } from "react-flow-renderer";
import { TSubsystemNode } from "../../types/flow";

import classes from "./SubsystemNode.module.scss";

interface Props {
	data: TSubsystemNode;
}

const SubsystemNode = ({ data }: Props): ReactElement => {
	console.log(data.requirements);
	console.log(data.requiredBy);
	return (
		<div className={classes.container}>
			{data.requirements.map((req) => (
				<Handle key={req} position={Position.Left} type="target" id={`${data.id}_${req}`} />
			))}
			<div className={classes.wrapper}>
				<div className={classes.title}>{data.title}</div>
				<div className={classes.img}>
					<Image src={data.img} layout="fill" objectFit="cover" alt={data.title} />
				</div>
				<p className={classes.description}>{data.description}</p>
			</div>
			{data.requiredBy.map((reqBy) => (
				<Handle key={reqBy} position={Position.Right} type="source" id={`${data.id}_${reqBy}`} />
			))}
		</div>
	);
};

export default memo(SubsystemNode);
