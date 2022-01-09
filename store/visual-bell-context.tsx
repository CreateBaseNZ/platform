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

/** Visual bell object; `null` if none shown. */
export type VisualBell = {
	/** Bell type identifier. */
	type: BellType;
	/** Message to be displayed. */
	message: string;
} | null;

/** Sets the visual bell context state. */
export type IntermediarySetter = (type?: /** Bell type identifier. */ BellType, message?: /** Message to be displayed. */ string) => void;

/** Visual bell context object. */
export type VisualBellCtx = {
	/** Visual bell object. */
	visualBell: VisualBell;
	/** Visual bell setter. */
	setVisualBell: IntermediarySetter;
};

/**
 * @ignore
 */
const VisualBellContext = createContext<VisualBellCtx>({
	visualBell: null,
	setVisualBell: () => {},
});

export default VisualBellContext;

type VisualBellProviderProps = {
	children: ReactNode;
};

/**
 * @ignore
 */
export const VisualBellContextProvider = ({ children }: VisualBellProviderProps) => {
	const [visualBell, setVisualBell] = useState<VisualBell>(null);

	const intermediarySetVisualBell: IntermediarySetter = useCallback((type, message) => (type && message ? setVisualBell({ type, message }) : setVisualBell(null)), []);

	const value = useMemo(
		() => ({
			visualBell: visualBell,
			setVisualBell: intermediarySetVisualBell,
		}),
		[visualBell, intermediarySetVisualBell]
	);

	return <VisualBellContext.Provider value={value}>{children}</VisualBellContext.Provider>;
};
