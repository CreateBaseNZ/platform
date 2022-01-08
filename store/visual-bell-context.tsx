import { useState, createContext, useMemo, ReactNode, useCallback } from "react";

/**
 * Visual bell type identifiers.
 * - `success` - green
 * - `neutral` - grey
 * - `alert`, `warning` - orange
 * - `error`, `catastrophe` - red
 * **Note: `catastrophe` and `warning` will persist unless manually dismissed.**
 */
export type BellType = "success" | "neutral" | "alert" | "warning" | "error" | "catastrophe";

export type VisualBell = {
	type: BellType;
	message: string;
} | null;

export interface IVisualBellCtx {
	visualBell: VisualBell;
	setVisualBell: (type?: BellType, message?: string) => void;
}

const VisualBellContext = createContext<IVisualBellCtx>({
	visualBell: null,
	setVisualBell: () => {},
});

export default VisualBellContext;

type VisualBellProviderProps = {
	children: ReactNode;
};

export const VisualBellContextProvider = ({ children }: VisualBellProviderProps) => {
	const [visualBell, setVisualBell] = useState<VisualBell>(null);

	console.log(visualBell);

	const intermediarySetVisualBell = useCallback((type?: BellType, message?: string) => (type && message ? setVisualBell({ type, message }) : setVisualBell(null)), []);

	const value = useMemo(
		() => ({
			visualBell: visualBell,
			setVisualBell: intermediarySetVisualBell,
		}),
		[visualBell, intermediarySetVisualBell]
	);

	return <VisualBellContext.Provider value={value}>{children}</VisualBellContext.Provider>;
};
