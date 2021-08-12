export const comparisonBoostLvl1Item = () => {
  const a = Math.floor(Math.random() * 99);
  const b = Math.floor(Math.random() * 99);
  return {
    q: [
      {
        id: "start",
        type: "start",
        position: { x: -80, y: -32 },
        data: { connections: ["execution__out"] },
      },
      {
        id: "dndnode_0",
        type: "greaterThan",
        position: { x: -48, y: -144 },
        data: {
          connections: ["boolean__out"],
          values: {
            a: a,
            b: b,
          },
        },
      },
      {
        id: "dndnode_1",
        type: "print",
        position: { x: 48, y: -64 },
        data: {
          connections: ["execution__in", "any__in__a"],
          values: { a: 0 },
        },
      },
      {
        source: "start",
        sourceHandle: "execution__out",
        target: "dndnode_1",
        targetHandle: "execution__in",
        type: "execution",
        animated: true,
        arrowHeadType: "arrowclosed",
        id: "reactflow__edge-startexecution__out-dndnode_0execution__in",
      },
      {
        source: "dndnode_0",
        sourceHandle: "boolean__out",
        target: "dndnode_1",
        targetHandle: "any__in__a",
        type: "boolean",
        id: "reactflow__edge-dndnode_1boolean__out-dndnode_0any__in__a",
      },
    ],
    a: (a > b).toString(),
  };
};

export const comparisonBoostLvl1Options = ["true", "false"];
