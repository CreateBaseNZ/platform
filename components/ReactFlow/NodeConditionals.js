import CustomHandle from "./Handles";

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
