import React, { createContext, Dispatch, ReactNode, SetStateAction, useCallback } from "react";

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

const VisualBellContext = createContext<VisualBell>(null);
const SetVisualBellContext = createContext<Dispatch<SetStateAction<VisualBell>>>(() => {});

type Props = {
	children: ReactNode;
};

export const VisualBellProvider = ({ children }: Props) => {
	const [visualBell, setVisualBell] = React.useState<VisualBell>(null);

	return (
		<VisualBellContext.Provider value={visualBell}>
			<SetVisualBellContext.Provider value={setVisualBell}>{children}</SetVisualBellContext.Provider>
		</VisualBellContext.Provider>
	);
};

export const useVisualBell = () => React.useContext(VisualBellContext);

/** Sets the visual bell context state. */
export type setVisualBell = (type?: /** Bell type identifier. */ BellType, message?: /** Message to be displayed. */ string) => void;

export const useSetVisualBell = () => {
	const setState = React.useContext(SetVisualBellContext);

	const setVisualBell: setVisualBell = useCallback((type, message) => (type && message ? setState({ type, message }) : setState(null)), [setState]);

	return setVisualBell;
};
