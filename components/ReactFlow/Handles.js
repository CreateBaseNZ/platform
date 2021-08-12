import { Handle, useStoreState } from "react-flow-renderer";

import classes from "./Handles.module.scss";

const isValidConnection = (connection) => {
  if (
    connection.targetHandle.split("__")[0] === "any" ||
    connection.sourceHandle.split("__")[0] === "any"
  ) {
    return true;
  }
  return (
    connection.targetHandle.split("__")[0] ===
    connection.sourceHandle.split("__")[0]
  );
};

const CustomHandle = (props) => {
  const [, , zoom] = useStoreState((state) => state.transform);

  const checkConnectable = () => {
    const execution = props.id.split("__")[0] === "execution";
    if (execution) {
      // execution (exclusively one)
      return props.connections
        ? !props.connections.includes(props.id) && props.isConnectable
        : props.isConnectable;
    } else {
      if (props.type === "target") {
        // param target (exclusively one)
        return props.connections
          ? !props.connections.includes(props.id) && props.isConnectable
          : props.isConnectable;
      } else {
        // param source (many)
        return props.isConnectable;
      }
    }
  };

  const isConnectable = checkConnectable();

  return (
    <Handle
      {...props}
      className={`${classes.handle} ${classes[props.type + "Handle"]} ${
        classes[props.position + "Handle"]
      } ${isConnectable ? "" : classes.hideEnd} ${
        classes[props.id.split("__")[0] + "Handle"]
      } ${props.className} ${zoom < 0.6 && "hide"}`}
      isValidConnection={isValidConnection}
      isConnectable={isConnectable}
    />
  );
};

export default CustomHandle;
