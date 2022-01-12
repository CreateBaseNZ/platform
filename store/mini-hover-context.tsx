import { useState, createContext, useMemo, ReactNode } from "react";

/** Node being hovered, or `null` if none. */
export type ActiveNode = {
	/** Unique identifier. */
	nodeType: string;
	/** Node JSX element. */
	block: JSX.Element;
} | null;

/** Mini node context object. */
export type MiniHoverCtx = {
	/** Node being hovered. */
	activeNode: ActiveNode;
	/** Function called on mouse enter. */
	mouseEnterHandler: (nodeType: string, block: JSX.Element) => void;
	/** Function called on mouse leave. */
	mouseLeaveHandler: () => void;
};

/**
 * @ignore
 */
const MiniHoverContext = createContext<MiniHoverCtx>({
	activeNode: null,
	mouseEnterHandler: () => {},
	mouseLeaveHandler: () => {},
});

export default MiniHoverContext;

type MiniHoverProviderProps = {
	children: ReactNode;
};

/**
 * @ignore
 */
export const MiniHoverContextProvider = ({ children }: MiniHoverProviderProps) => {
	const [activeNode, setActiveNode] = useState<ActiveNode>(null);

	const mouseEnterHandler = (nodeType: string, block: any): void => setActiveNode({ nodeType, block });

	const mouseLeaveHandler = (): void => setActiveNode(null);

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
