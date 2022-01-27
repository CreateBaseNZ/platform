import { memo, ReactElement } from "react";
import Image from "next/image";
import { Handle, Position } from "react-flow-renderer";
import { TSubsystemNodeData } from "../../types/flow";
import Link from "next/link";

import classes from "./SubsystemNode.module.scss";
import { useRouter } from "next/router";

interface Props {
	data: TSubsystemNodeData;
}

const SubsystemNode = ({ data }: Props): ReactElement => {
	const router = useRouter();

	return (
		<div className={classes.container}>
			<div className={classes.handles}>
				{data.requirements.map((req, i) => (
					<Handle key={req} position={Position.Left} type="target" id={`${data.id}_${req}`} className={classes.handle} style={{ top: `${((i + 1) / (data.requirements.length + 1)) * 100}%` }} />
				))}
			</div>
			<div className={classes.wrapper}>
				<div className={classes.title}>{data.title}</div>
				<div className={classes.img}>
					<Image src={data.img} layout="fill" objectFit="cover" alt={data.title} />
				</div>
				<p className={classes.description}>{data.description}</p>
				<Link href={{ pathname: `/project/[id]/create/[subsystem]`, query: { id: router.query.id, subsystem: data.id } }}>
					<a className={classes.btn} draggable={false} title="Continue to subsystem">
						Continue
					</a>
				</Link>
			</div>
			<div className={classes.handles}>
				{data.requiredBy.map((reqBy) => (
					<Handle key={reqBy} position={Position.Right} type="source" id={`${data.id}_${reqBy}`} className={classes.handle} />
				))}
			</div>
		</div>
	);
};

export default memo(SubsystemNode);
