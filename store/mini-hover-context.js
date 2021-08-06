import { useState, useRef, createContext, useMemo } from "react";

const MiniHoverContext = createContext({
  activeNode: null,
  mouseEnterHandler: () => {},
  mouseLeaveHandler: () => {},
  clearNow: () => {},
});

export default MiniHoverContext;

export const MiniHoverContextProvider = (props) => {
  const [activeNode, setActiveNode] = useState();
  const [sticky, setSticky] = useState(false);
  const activeNodeTimer = useRef(null);
  const clearTimer = useRef(null);

  const setAfterDelay = (nodeType, block) => {
    activeNodeTimer.current = setTimeout(() => {
      setActiveNode({ nodeType: nodeType, block: block });
      setSticky(true);
      activeNodeTimer.current = null;
    }, 500);
  };

  const setNow = (nodeType, block) => {
    setActiveNode({ nodeType: nodeType, block: block });
    setSticky(true);
    clearTimeout(clearTimer.current);
  };

  const clearAfterDelay = () => {
    clearTimer.current = setTimeout(() => {
      setActiveNode(null);
      setSticky(false);
    }, 200);
  };

  const clearNow = () => {
    clearTimeout(activeNodeTimer.current);
    setActiveNode(null);
    setSticky(false);
  };

  const mouseEnterHandler = (nodeType, block) => {
    if (sticky) {
      setNow(nodeType, block);
    } else {
      setAfterDelay(nodeType, block);
    }
  };

  const mouseLeaveHandler = () => {
    if (activeNodeTimer.current) {
      clearNow();
    } else {
      clearAfterDelay();
    }
  };

  const value = useMemo(
    () => ({
      activeNode: activeNode,
      mouseEnterHandler: mouseEnterHandler,
      mouseLeaveHandler: mouseLeaveHandler,
      clearNow: clearNow,
    }),
    [activeNode]
  );

  return (
    <MiniHoverContext.Provider value={value}>
      {props.children}
    </MiniHoverContext.Provider>
  );
};
