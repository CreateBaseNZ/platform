import { Handle } from "react-flow-renderer";
import { isValidConnection } from "../../utils/nodeHelpers";

import classes from "./Nodes.module.scss";

export const NodeIf = ({ data }) => {
  return (
    <div
      className={`${classes.node} ${classes.conditionals} ${classes.nodeIf} ${classes.hasLeftHandle} ${classes.hasRightHandle} ${classes.hasRightLabel}`}
    >
      <Handle
        type="target"
        position="left"
        id="execution"
        isValidConnection={isValidConnection}
        className={`${classes.handle} ${classes.leftHandle} ${classes.executionHandle} ${classes.targetHandle}`}
      />
      <h4>If</h4>
      <input className={classes.preventInput} />
      <Handle
        type="target"
        position="top"
        id="param__condition"
        isValidConnection={isValidConnection}
        className={`${classes.handle} ${classes.topHandle} ${classes.paramHandle} ${classes.targetHandle}`}
        style={{ left: "52px", transform: "none" }}
      />
      <div className={classes.rightHandleLabel} style={{ top: 16 }}>
        Do
      </div>
      <div className={classes.rightHandleLabel} style={{ top: 50 }}>
        Else
      </div>
      <div className={classes.rightHandleLabel} style={{ bottom: 16 }}>
        Then
      </div>
      <Handle
        type="source"
        position="right"
        id="execution__0"
        isValidConnection={isValidConnection}
        className={`${classes.handle} ${classes.rightHandle} ${classes.sourceHandle} ${classes.executionHandle}`}
        style={{ top: 16, transform: "none" }}
      />
      <Handle
        type="source"
        position="right"
        id="execution__1"
        isValidConnection={isValidConnection}
        className={`${classes.handle} ${classes.rightHandle} ${classes.sourceHandle} ${classes.executionHandle}`}
        style={{ top: 50, transform: "none" }}
      />
      <Handle
        type="source"
        position="right"
        id="execution__2"
        isValidConnection={isValidConnection}
        className={`${classes.handle} ${classes.rightHandle} ${classes.sourceHandle} ${classes.executionHandle}`}
        style={{ bottom: 16, top: "auto", transform: "none" }}
      />
    </div>
  );
};

export const NodeRepeat = ({ data }) => {
  const changeHandler = (event) => {
    data.callBack({ ...data.values, condition: event.target.value });
  };

  return (
    <div
      className={`${classes.node} ${classes.conditionals} ${classes.nodeRepeat} ${classes.hasLeftHandle} ${classes.hasRightHandle} ${classes.hasRightLabel}`}
    >
      <Handle
        type="target"
        position="left"
        id="execution"
        isValidConnection={isValidConnection}
        className={`${classes.handle} ${classes.leftHandle} ${classes.executionHandle} ${classes.targetHandle}`}
      />
      <h4>Repeat</h4>
      <input
        onChange={changeHandler}
        type="number"
        value={data.values.condition}
      />
      <Handle
        type="target"
        position="top"
        id="param__condition"
        isValidConnection={isValidConnection}
        className={`${classes.handle} ${classes.topHandle} ${classes.paramHandle} ${classes.targetHandle}`}
        style={{ left: "91px", transform: "none" }}
      />
      <div className={classes.rightHandleLabel} style={{ top: 16 }}>
        Do
      </div>
      <div className={classes.rightHandleLabel} style={{ bottom: 16 }}>
        Then
      </div>
      <Handle
        type="source"
        position="right"
        id="execution__0"
        isValidConnection={isValidConnection}
        className={`${classes.handle} ${classes.rightHandle} ${classes.sourceHandle} ${classes.executionHandle}`}
        style={{ top: 16, transform: "none" }}
      />
      <Handle
        type="source"
        position="right"
        id="execution__1"
        isValidConnection={isValidConnection}
        className={`${classes.handle} ${classes.rightHandle} ${classes.sourceHandle} ${classes.executionHandle}`}
        style={{ bottom: 16, top: "auto", transform: "none" }}
      />
    </div>
  );
};

export const NodeWhile = ({ data }) => {
  return (
    <div
      className={`${classes.node} ${classes.conditionals} ${classes.nodeWhile} ${classes.hasLeftHandle} ${classes.hasRightHandle} ${classes.hasRightLabel}`}
    >
      <Handle
        type="target"
        position="left"
        id="execution"
        isValidConnection={isValidConnection}
        className={`${classes.handle} ${classes.leftHandle} ${classes.executionHandle} ${classes.targetHandle}`}
      />
      <h4>While</h4>
      <input className={classes.preventInput} />
      <Handle
        type="target"
        position="top"
        id="param__condition"
        isValidConnection={isValidConnection}
        className={`${classes.handle} ${classes.topHandle} ${classes.paramHandle} ${classes.targetHandle}`}
        style={{ left: "86px", transform: "none" }}
      />
      <div className={classes.rightHandleLabel} style={{ top: 16 }}>
        Do
      </div>
      <div className={classes.rightHandleLabel} style={{ bottom: 16 }}>
        Then
      </div>
      <Handle
        type="source"
        position="right"
        id="execution__0"
        isValidConnection={isValidConnection}
        className={`${classes.handle} ${classes.rightHandle} ${classes.sourceHandle} ${classes.executionHandle}`}
        style={{ top: 16, transform: "none" }}
      />
      <Handle
        type="source"
        position="right"
        id="execution__1"
        isValidConnection={isValidConnection}
        className={`${classes.handle} ${classes.rightHandle} ${classes.sourceHandle} ${classes.executionHandle}`}
        style={{ bottom: 16, top: "auto", transform: "none" }}
      />
    </div>
  );
};

const NodeConditionalsMini = (props) => {
  return (
    <div
      className={`${classes.nodeMini} ${classes.conditionals}`}
      onDragStart={props.onDragStart}
      draggable
    >
      <h4>{props.label}</h4>
      <div className={classes.blankInput}></div>
    </div>
  );
};

export const NodeIfMini = (props) => {
  return <NodeConditionalsMini {...props} label="If" />;
};
export const NodeRepeatMini = (props) => {
  return <NodeConditionalsMini {...props} label="Repeat" />;
};
export const NodeWhileMini = (props) => {
  return <NodeConditionalsMini {...props} label="While" />;
};
