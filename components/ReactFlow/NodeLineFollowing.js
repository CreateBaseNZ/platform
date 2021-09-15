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
  console.log(data);
  return (
    <div
      className={`${classes.node} ${classes.actioning} ${classes.hasLeftHandle} ${classes.hasRightHandle} ${className}`}
    >
      <CustomHandle
        type="target"
        position="left"
        id="execution__in"
        style={{ top: "30px", transform: "none" }}

        isConnectable={isConnectable}
        connections={data ? data.connections : []}
      />
      <h4>{label}</h4>
      <EntityDropdown data={data} selectName={selectName} dataName={dataName} project="LineFollowing"/>
      <CustomHandle
        type="target"
        position="left"
        id="float__in__a"
        style={{ bottom: "15px", transform: "none" }}
        isConnectable={isConnectable}
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
        <div
          className={classes.blankInput}
          style={{ borderRadius: "99px", alignSelf: "center" }}
        />
      </div>
    </NodeMini>
  );
});
