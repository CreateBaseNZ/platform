import CustomHandle from "./Handles";
import { NodeMini } from "./NodeGeneral";

import classes from "./Nodes.module.scss";

export const NodeIf = ({ data }) => {
  return (
    <div
      className={`${classes.node} ${classes.conditionals} ${classes.nodeIf} ${classes.hasLeftHandle} ${classes.hasRightHandle} ${classes.hasRightLabel}`}
    >
      <CustomHandle type="target" position="left" id="execution" />
      <h4>If</h4>
      <input className={classes.preventInput} />
      <CustomHandle
        type="target"
        position="top"
        id="param__condition"
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
      <CustomHandle
        type="source"
        position="right"
        id="execution__0"
        style={{ top: 16, transform: "none" }}
      />
      <CustomHandle
        type="source"
        position="right"
        id="execution__1"
        style={{ top: 50, transform: "none" }}
      />
      <CustomHandle
        type="source"
        position="right"
        id="execution__2"
        style={{ bottom: 16, top: "auto", transform: "none" }}
      />
    </div>
  );
};

export const NodeRepeat = ({ data }) => {
  const changeHandler = (event) => {
    data.callBack({ ...data.values, condition: event.target.value });
  };
  const dragHandler = (event) => {
    event.preventDefault();
  };
  return (
    <div
      className={`${classes.node} ${classes.conditionals} ${classes.nodeRepeat} ${classes.hasLeftHandle} ${classes.hasRightHandle} ${classes.hasRightLabel}`}
    >
      <CustomHandle type="target" position="left" id="execution" />
      <h4>Repeat</h4>
      <input
        onChange={changeHandler}
        className="nodrag"
        type="number"
        value={data.values.condition}
        onDragStart={dragHandler}
        onKeyDown={(e) =>
          (e.key === "e" || e.key === "-" || e.key === ".") &&
          e.preventDefault()
        }
      />
      <CustomHandle
        type="target"
        position="top"
        id="param__condition"
        style={{ left: "91px", transform: "none" }}
      />
      <div className={classes.rightHandleLabel} style={{ top: 16 }}>
        Do
      </div>
      <div className={classes.rightHandleLabel} style={{ bottom: 16 }}>
        Then
      </div>
      <CustomHandle
        type="source"
        position="right"
        id="execution__0"
        style={{ top: 16, transform: "none" }}
      />
      <CustomHandle
        type="source"
        position="right"
        id="execution__1"
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
      <CustomHandle type="target" position="left" id="execution" />
      <h4>While</h4>
      <input className={classes.preventInput} />
      <CustomHandle
        type="target"
        position="top"
        id="param__condition"
        style={{ left: "86px", transform: "none" }}
      />
      <div className={classes.rightHandleLabel} style={{ top: 16 }}>
        Do
      </div>
      <div className={classes.rightHandleLabel} style={{ bottom: 16 }}>
        Then
      </div>
      <CustomHandle
        type="source"
        position="right"
        id="execution__0"
        style={{ top: 16, transform: "none" }}
      />
      <CustomHandle
        type="source"
        position="right"
        id="execution__1"
        style={{ bottom: 16, top: "auto", transform: "none" }}
      />
    </div>
  );
};

const NodeConditionalsMini = (props) => {
  return (
    <NodeMini {...props} className={classes.conditionals}>
      <h4>{props.label}</h4>
      <div className={classes.blankInput}></div>
    </NodeMini>
  );
};

export const NodeIfMini = () => {
  return <NodeConditionalsMini label="If" nodeType="if" />;
};
export const NodeRepeatMini = () => {
  return <NodeConditionalsMini label="Repeat" nodeType="repeat" />;
};
export const NodeWhileMini = () => {
  return <NodeConditionalsMini label="While" nodeType="while" />;
};
