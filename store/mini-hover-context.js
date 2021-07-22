import { useState, useRef, createContext } from "react";

const MiniHoverContext = createContext({
  activeNode: null,
  mouseEnterHandler: () => {},
  mouseLeaveHandler: () => {},
  clearNow: () => {},
});

export default MiniHoverContext;

export const MiniHoverContextProvider = (props) => {
  const [activeNode, setActiveNode] = useState(null);
  const [sticky, setSticky] = useState(false);
  const activeNodeTimer = useRef(null);
  const clearTimer = useRef(null);

  console.log(activeNode);

  const setAfterDelay = (node) => {
    activeNodeTimer.current = setTimeout(() => {
      setActiveNode(node);
      setSticky(true);
      activeNodeTimer.current = null;
    }, 500);
  };

  const setNow = (node) => {
    setActiveNode(node);
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

  const mouseEnterHandler = (node) => {
    if (sticky) {
      setNow(node);
    } else {
      setAfterDelay(node);
    }
  };

  const mouseLeaveHandler = () => {
    console.log(activeNodeTimer.current);
    if (activeNodeTimer.current) {
      clearNow();
    } else {
      clearAfterDelay();
    }
  };

  return (
    <MiniHoverContext.Provider
      value={{
        activeNode: activeNode,
        mouseEnterHandler: mouseEnterHandler,
        mouseLeaveHandler: mouseLeaveHandler,
        clearNow: clearNow,
      }}
    >
      {props.children}
    </MiniHoverContext.Provider>
  );
};
