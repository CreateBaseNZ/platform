import { memo, useContext } from "react";
import CustomHandle from "./Handles";
// import { entities } from "../../utils/flowConfig";
import MiniHoverContext from "../../store/mini-hover-context";
import classes from "./Nodes.module.scss";

export const NodeStart = memo(({ data = { connections: [] }, isConnectable }) => {
	return (
		<div className={`${classes.node} ${classes.nodeStart} ${classes.hasRightHandle}`}>
			<h4>Start</h4>
			<CustomHandle type="source" position="right" id="execution__out" isConnectable={isConnectable} connections={data.connections} />
		</div>
	);
});

export const NodeMini = memo(({ nodeType, className, node, children, style }) => {
	const miniHoverCtx = useContext(MiniHoverContext);

	const dragStartHandler = (event) => {
		event.dataTransfer.setData("application/reactflow", nodeType);
		event.dataTransfer.effectAllowed = "move";
		miniHoverCtx.clearNow();
	};

	return (
		<div
			className={`${classes.nodeMini} ${className}`}
			onDragStart={dragStartHandler}
			onMouseEnter={miniHoverCtx.mouseEnterHandler.bind(this, nodeType, node)}
			onMouseLeave={miniHoverCtx.mouseLeaveHandler}
			style={style}
			draggable>
			{children}
		</div>
	);
});

// options = entities
export const EntityDropdown = ({ data, selectName, dataName, options = [] }) => {
	const changeHandler = (event) => {
		data.callBack({ ...data.values, [dataName]: event.target.value });
	};

	const dragHandler = (event) => {
		event.preventDefault();
	};

	return (
		<select name={selectName} onChange={changeHandler} onDragStart={dragHandler} value={data.values.entity}>
			{options.map((entity) => (
				<option value={entity.toLowerCase()} key={entity}>
					{entity}
				</option>
			))}
		</select>
	);
};

export const InputWithHandle = ({ data, blockId, handleId, inputName }) => {
	const changeHandler = (event) => {
		console.log(blockId);
		data.callBack({ ...data.values, [inputName]: event.target.value }, blockId);
	};
	const prevent = data.connections.includes(handleId);

	return (
		<input
			className={`nodrag ${prevent ? classes.preventInput : ""}`}
			onChange={changeHandler}
			type="number"
			value={prevent ? "" : data.values[inputName]}
			onDragStart={(e) => e.preventDefault()}
			onKeyDown={(e) => e.key === "e" && e.preventDefault()}
		/>
	);
};
