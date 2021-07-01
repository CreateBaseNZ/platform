import { getSmoothStepPath, getMarkerEnd } from "react-flow-renderer";

const borderRadius = 6;
const strokeWidth = 1;

export const CustomConnectionLine = ({
  sourceX,
  sourceY,
  sourcePosition,
  targetX,
  targetY,
  targetPosition,
}) => {
  const edgePath = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: borderRadius,
  });
  return (
    <g>
      <path
        fill="none"
        stroke="#929292"
        strokeWidth={strokeWidth}
        className="animated"
        d={edgePath}
      />
      <circle
        cx={targetX}
        cy={targetY}
        fill="none"
        r={3}
        stroke="#ffffff"
        strokeWidth={1}
      />
    </g>
  );
};

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  sourcePosition,
  targetX,
  targetY,
  targetPosition,
  style = {},
  arrowHeadType,
  markerEndId,
}) => {
  const edgePath = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: borderRadius,
  });
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);

  return (
    <>
      <path
        id={id}
        fill="none"
        stroke="#ffffff"
        className="animated"
        strokeWidth={strokeWidth}
        d={edgePath}
        style={style}
        markerEnd={markerEnd}
      />
    </>
  );
};

export default CustomEdge;
