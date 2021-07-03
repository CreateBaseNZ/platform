import { getSmoothStepPath, getMarkerEnd } from "react-flow-renderer";

const borderRadius = 6;
const strokeWidth = 1;

const ExeEdge = ({
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

export default ExeEdge;
