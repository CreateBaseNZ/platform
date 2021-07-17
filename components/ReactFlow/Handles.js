import { Handle, useStoreState } from "react-flow-renderer";

import classes from "./Nodes.module.scss";

const isValidConnection = (connection) => {
  return (
    connection.targetHandle.split("__")[0] ===
    connection.sourceHandle.split("__")[0]
  );
};

const CustomHandle = (props) => {
  const [, , zoom] = useStoreState((state) => state.transform);

  return (
    <Handle
      {...props}
      className={`${classes.handle} ${classes[props.type + "Handle"]} ${
        classes[props.position + "Handle"]
      } ${classes[props.id.split("__")[0] + "Handle"]} ${props.className} ${
        zoom < 0.6 && "hide"
      }`}
      isValidConnection={isValidConnection}
    />
  );
};

export default CustomHandle;
