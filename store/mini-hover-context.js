import { useState, createContext, useMemo } from "react";

const MiniHoverContext = createContext({
	activeNode: null,
	mouseEnterHandler: () => {},
	mouseLeaveHandler: () => {},
});

export default MiniHoverContext;

export const MiniHoverContextProvider = (props) => {
	const [activeNode, setActiveNode] = useState();

	const mouseEnterHandler = (nodeType, block) => setActiveNode({ nodeType, block });

	const mouseLeaveHandler = () => setActiveNode(null);

	const value = useMemo(
		() => ({
			activeNode: activeNode,
			mouseEnterHandler: mouseEnterHandler,
			mouseLeaveHandler: mouseLeaveHandler,
		}),
		[activeNode]
	);

	return <MiniHoverContext.Provider value={value}>{props.children}</MiniHoverContext.Provider>;
};
