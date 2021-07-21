import { memo, useState, useEffect } from "react";
import CustomHandle from "./Handles";

import { entities } from "../../utils/flowConfig";

import classes from "./Nodes.module.scss";

export const NodeStart = memo(() => {
  return (
    <div
      className={`${classes.node} ${classes.nodeStart} ${classes.hasRightHandle}`}
    >
      <h4>Start</h4>
      <CustomHandle type="source" position="right" id="execution" />
    </div>
  );
});

export const NodeMini = memo((props) => {
  const [hovered, setHovered] = useState(false);

  const dragStartHandler = (event) => {
    event.dataTransfer.setData("application/reactflow", props.nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const mouseEnterHandler = () => setHovered(true);
  const mouseLeaveHandler = () => setHovered(false);

  const onTimeout = () => {
    props.showPreview();
  };

  useEffect(() => {
    const timer = hovered && setTimeout(onTimeout, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [hovered]);

  return (
    <div
      {...props}
      className={`${classes.nodeMini} ${props.className}`}
      onDragStart={dragStartHandler}
      draggable
    >
      {props.children}
    </div>
  );
});

export const EntityDropdown = ({
  data,
  selectName,
  dataName,
  options = entities,
}) => {
  const changeHandler = (event) => {
    data.callBack({ ...data.values, [dataName]: event.target.value });
  };

  const dragHandler = (event) => {
    event.preventDefault();
  };

  return (
    <select
      name={selectName}
      onChange={changeHandler}
      onDragStart={dragHandler}
      value={data.values.entity}
    >
      {options.map((entity) => (
        <option value={entity.toLowerCase()} key={entity}>
          {entity}
        </option>
      ))}
    </select>
  );
};
