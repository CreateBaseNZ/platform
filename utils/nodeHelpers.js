export const isValidConnection = (connection) => {
  return (
    connection.targetHandle.split("__")[0] ===
    connection.sourceHandle.split("__")[0]
  );
};
