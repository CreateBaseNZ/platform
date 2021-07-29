import CustomHandle from "./Handles";
import { InputWithHandle, NodeMini } from "./NodeGeneral";

import classes from "./Nodes.module.scss";

export const NodeIf = ({ data, isConnectable }) => {
  return (
    <div
      className={`${classes.node} ${classes.conditionals} ${classes.nodeIf} ${classes.hasLeftHandle} ${classes.hasRightHandle} ${classes.hasRightLabel}`}
    >
      <CustomHandle
        type="target"
        position="left"
        id="execution__in"
        isConnectable={isConnectable}
        connections={data ? data.connections : []}
      />
      <h4>If</h4>
      <input className={classes.preventInput} />
      <CustomHandle
        type="target"
        position="top"
        id="boolean__condition"
        style={{ left: "52px", transform: "none" }}
        isConnectable={isConnectable}
        connections={data ? data.connections : []}
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
        isConnectable={isConnectable}
        connections={data ? data.connections : []}
      />
      <CustomHandle
        type="source"
        position="right"
        id="execution__1"
        style={{ top: 50, transform: "none" }}
        isConnectable={isConnectable}
        connections={data ? data.connections : []}
      />
      <CustomHandle
        type="source"
        position="right"
        id="execution__2"
        style={{ bottom: 16, top: "auto", transform: "none" }}
        isConnectable={isConnectable}
        connections={data ? data.connections : []}
      />
    </div>
  );
};

export const NodeRepeat = ({
  id,
  data = { values: { condition: 1 }, connections: [] },
  isConnectable,
}) => {
  return (
    <div
      className={`${classes.node} ${classes.conditionals} ${classes.nodeRepeat} ${classes.hasLeftHandle} ${classes.hasRightHandle} ${classes.hasRightLabel}`}
    >
      <CustomHandle
        type="target"
        position="left"
        id="execution__in"
        isConnectable={isConnectable}
        connections={data ? data.connections : []}
      />
      <h4>Repeat</h4>
      <InputWithHandle
        data={data}
        blockId={id}
        handleId={"param__condition"}
        inputName="condition"
      />
      <CustomHandle
        type="target"
        position="top"
        id="float__condition"
        style={{ left: "91px", transform: "none" }}
        isConnectable={isConnectable}
        connections={data ? data.connections : []}
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
        isConnectable={isConnectable}
        connections={data ? data.connections : []}
      />
      <CustomHandle
        type="source"
        position="right"
        id="execution__1"
        style={{ bottom: 16, top: "auto", transform: "none" }}
        isConnectable={isConnectable}
        connections={data ? data.connections : []}
      />
    </div>
  );
};

export const NodeWhile = ({ data, isConnectable }) => {
  return (
    <div
      className={`${classes.node} ${classes.conditionals} ${classes.nodeWhile} ${classes.hasLeftHandle} ${classes.hasRightHandle} ${classes.hasRightLabel}`}
    >
      <CustomHandle
        type="target"
        position="left"
        id="execution__in"
        isConnectable={isConnectable}
        connections={data ? data.connections : []}
      />
      <h4>While</h4>
      <input className={classes.preventInput} />
      <CustomHandle
        type="target"
        position="top"
        id="boolean__condition"
        style={{ left: "86px", transform: "none" }}
        isConnectable={isConnectable}
        connections={data ? data.connections : []}
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
        isConnectable={isConnectable}
        connections={data ? data.connections : []}
      />
      <CustomHandle
        type="source"
        position="right"
        id="execution__1"
        style={{ bottom: 16, top: "auto", transform: "none" }}
        isConnectable={isConnectable}
        connections={data ? data.connections : []}
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
  return <NodeConditionalsMini label="If" nodeType="if" node={<NodeIf />} />;
};
export const NodeRepeatMini = () => {
  return (
    <NodeConditionalsMini
      label="Repeat"
      nodeType="repeat"
      node={<NodeRepeat />}
    />
  );
};
export const NodeWhileMini = () => {
  return (
    <NodeConditionalsMini label="While" nodeType="while" node={<NodeWhile />} />
  );
};
