import { memo, ReactElement } from "react";
import { TSubsystemNode } from "../../types/flow";

import classes from "./SubsystemNode.module.scss";

interface Props {
	data: TSubsystemNode;
}

const SubsystemNode = ({ data }: Props): ReactElement => {
	return <div className={classes.node}>{data.title}</div>;
};

export default memo(SubsystemNode);
