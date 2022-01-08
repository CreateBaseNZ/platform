import { useState, createContext, useMemo, ReactNode } from "react";

// TODO replace any type
export type ActiveNode = {
	nodeType: any;
	block: any;
} | null;

// TODO replace any type
export interface IMiniHoverCtx {
	activeNode: ActiveNode;
	mouseEnterHandler: any;
	mouseLeaveHandler: any;
}

/**
 * @ignore
 */
const MiniHoverContext = createContext<IMiniHoverCtx>({
	activeNode: null,
	mouseEnterHandler: () => {},
	mouseLeaveHandler: () => {},
});

export default MiniHoverContext;

/**
 * @ignore
 */
type MiniHoverProviderProps = {
	children: ReactNode;
};

/**
 * @ignore
 */
export const MiniHoverContextProvider = ({ children }: MiniHoverProviderProps) => {
	const [activeNode, setActiveNode] = useState<ActiveNode>(null);

	// TODO replace any type
	const mouseEnterHandler = (nodeType: any, block: any) => {
		console.log(nodeType);
		console.log(block);
		setActiveNode({ nodeType, block });
	};

	const mouseLeaveHandler = () => setActiveNode(null);

	const value = useMemo(
		() => ({
			activeNode: activeNode,
			mouseEnterHandler: mouseEnterHandler,
			mouseLeaveHandler: mouseLeaveHandler,
		}),
		[activeNode]
	);

	return <MiniHoverContext.Provider value={value}>{children}</MiniHoverContext.Provider>;
};
