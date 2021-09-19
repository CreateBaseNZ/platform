import { memo } from "react";
import { EntityDropdown, NodeMini, InputWithHandle} from "./NodeGeneral";
import CustomHandle from "./Handles";
import { getDefaultValues } from "../../utils/flowHelpers";

import classes from "./Nodes.module.scss";

const NodeLineFollowing = ({
  data = { values: getDefaultValues({selectName }), connections: [] },
  id,
  className,
  label,
  selectName,
  dataName,
  isConnectable,
}) => {
  return (
    <div
      className={`${classes.node} ${classes.actioning} ${classes.hasLeftHandle} ${classes.hasRightHandle} ${className}`}
    >
      <CustomHandle
        type="target"
        position="left"
        id="execution__in"
        isConnectable={isConnectable}
        connections={data ? data.connections : []}
      />
      <h4>{label}</h4>
      <CustomHandle
        type="target"
        position="top"
        id="float__in__a"
        style={{ left: "auto", right: "40px", transform: "none" }}        isConnectable={isConnectable}
        connections={data ? data.connections : []}
      />
      <CustomHandle
        type="source"
        position="right"
        id="execution__out"
        isConnectable={isConnectable}
        connections={data ? data.connections : []}
      />
      <InputWithHandle
        data={data}
        blockId={id}
        handleId="float__in__a"
        inputName="a"
      />
    </div>
  );
};

export const NodeLeftWheel = memo(({id, data, isConnectable }) => {
  return (
    <NodeLineFollowing
      data={data}
      id={id}
      className={classes.moveForward}
      label="Left Wheel"
      selectName="leftWheel"
      dataName="entity"
      isConnectable={isConnectable}
    />
  );
});

export const NodeMoveForward = memo(({id, data, isConnectable }) => {
  return (
    <NodeLineFollowing
      data={data}
      id={id}
      className={classes.moveForward}
      label="Move Forward"
      selectName="moveForward"
      dataName="entity"
      isConnectable={isConnectable}
    />
  );
});

export const NodeMoveBackward = memo(({id, data, isConnectable }) => {
  return (
    <NodeLineFollowing
      data={data}
      id={id}
      className={classes.moveForward}
      label="Move Backwards"
      selectName="moveBackward"
      dataName="entity"
      isConnectable={isConnectable}
    />
  );
});

export const NodeRightWheel = memo(({id, data, isConnectable }) => {
  return (
    <NodeLineFollowing
      data={data}
      id={id}
      className={classes.moveForward}
      label="Right Wheel"
      selectName="rightWheel"
      dataName="entity"
      isConnectable={isConnectable}
    />
  );
});

const NodeLineFollowingMini = (props) => {
  return (
    <NodeMini {...props} className={`${classes.actioning} ${props.className}`}>
      <h4>{props.label}</h4>
      {/* <div className={classes.blankInput}></div> */}
    </NodeMini>
  );
};

export const NodeLeftWheelMini = () => {
  return (
    <NodeLineFollowingMini
      className={classes.nodeAttack}
      label="Left Wheel"
      nodeType="leftWheel"
      node={<NodeLeftWheel />}
    />
  );
};

export const NodeMoveForwardMini = () => {
  return (
    <NodeLineFollowingMini
      className={classes.nodeAttack}
      label="Move Forward"
      nodeType="moveForward"
      node={<NodeMoveForward />}
    />
  );
};

export const NodeMoveBackwardMini = () => {
  return (
    <NodeLineFollowingMini
      className={classes.nodeAttack}
      label="Move Backward"
      nodeType="moveBackward"
      node={<NodeMoveBackward />}
    />
  );
};

export const NodeRightWheelMini = () => {
  return (
    <NodeLineFollowingMini
      className={classes.nodeAttack}
      label="Right Wheel"
      nodeType="rightWheel"
      node={<NodeRightWheel />}
    />
  );
};

export const NodeWateHose = memo(
  ({
    id,
    data = { values: getDefaultValues("waterHose"), connections: [] },
    isConnectable,
  }) => {
    const changeHandler = () => {
      console.log(data.values.a);
      data.callBack({ a: !data.values.a }, id);
    };
    return (
      <div
        className={`${classes.node} ${classes.actioning} ${classes.nodeMagneticSwitch} ${classes.hasLeftHandle} ${classes.hasRightHandle}`}
      >
        <CustomHandle
          type="target"
          position="left"
          id="execution__in"
          isConnectable={isConnectable}
          connections={data ? data.connections : []}
        />
        <h4>Water Hose</h4>
        <div className={classes.flexRow}>
          <div
            className={classes.label}
            style={{ opacity: data.values.a && "0" }}
          >
            Off
          </div>
          <div
            className={`nodrag ${classes.toggle}`}
            onDragStart={(e) => e.preventDefault}
          >
            <input
              type="checkbox"
              checked={data.values.a}
              onChange={changeHandler}
            />
            <div />
          </div>
          <div
            className={classes.label}
            style={{ opacity: !data.values.a && "0" }}
          >
            On
          </div>
        </div>
        <CustomHandle
          type="source"
          position="right"
          id="execution__out"
          isConnectable={isConnectable}
          connections={data ? data.connections : []}
        />
      </div>
    );
  }
);

export const NodeWateHoseMini = memo(() => {
  return (
    <NodeMini
      nodeType="waterHose"
      node={<NodeWateHose />}
      className={classes.actioning}
      style={{ height: "3rem" }}
    >
      <div className={classes.flexCol} style={{ marginTop: "-4px" }}>
        <h4>Water Hose</h4>
      </div>
    </NodeMini>
  );
});

export const NodeTurn = memo(
  ({
    id,
    data = { values: getDefaultValues("waterHose"), connections: [] },
    isConnectable,
  }) => {
    const changeHandler = () => {
      console.log(data.values.a);
      data.callBack({ a: !data.values.a }, id);
    };
    return (
      <div
        className={`${classes.node} ${classes.actioning} ${classes.nodeTurn} ${classes.hasLeftHandle} ${classes.hasRightHandle}`}
      >
        <CustomHandle
          type="target"
          position="left"
          id="execution__in"
          isConnectable={isConnectable}
          connections={data ? data.connections : []}
        />
        <h4>Turn</h4>
        <div className={classes.flexRow}>
          <div
            className={classes.label}
            style={{ opacity: data.values.a && "0" }}
          >
            Anti-clockwise
          </div>
          <div
            className={`nodrag ${classes.toggle}`}
            onDragStart={(e) => e.preventDefault}
          >
            <input
              type="checkbox"
              checked={data.values.a}
              onChange={changeHandler}
            />
            <div />
          </div>
          <div
            className={classes.label}
            style={{ opacity: !data.values.a && "0" }}
          >
            Clockwise
          </div>
        </div>
        <CustomHandle
          type="source"
          position="right"
          id="execution__out"
          isConnectable={isConnectable}
          connections={data ? data.connections : []}
        />
      </div>
    );
  }
);

export const NodeTurnMini = memo(() => {
  return (
    <NodeMini
      nodeType="turn"
      node={<NodeTurn />}
      className={classes.actioning}
      style={{ height: "3rem" }}
    >
      <div className={classes.flexCol} style={{ marginTop: "-4px" }}>
        <h4>Turn</h4>
      </div>
    </NodeMini>
  );
});

export const NodeStop = memo(
  ({
    id,
    data = { values: getDefaultValues("waterHose"), connections: [] },
    isConnectable,
  }) => {
    return (
      <div
        className={`${classes.node} ${classes.actioning} ${classes.hasLeftHandle} ${classes.hasRightHandle}`}
      >
        <CustomHandle
          type="target"
          position="left"
          id="execution__in"
          isConnectable={isConnectable}
          connections={data ? data.connections : []}
        />
        <h4>Stop</h4>
        <CustomHandle
          type="source"
          position="right"
          id="execution__out"
          isConnectable={isConnectable}
          connections={data ? data.connections : []}
        />
      </div>
    );
  }
);

export const NodeStopMini = memo(() => {
  return (
    <NodeMini
      nodeType="stop"
      node={<NodeStop />}
      className={classes.actioning}
      style={{ height: "3rem" }}
    >
      <div className={classes.flexCol} style={{ marginTop: "-4px" }}>
        <h4>Stop</h4>
      </div>
    </NodeMini>
  );
});