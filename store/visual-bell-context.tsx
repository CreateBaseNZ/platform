import { useState, createContext, useMemo, useEffect, useRef, SetStateAction, Dispatch } from "react";

type BellType = "success" | "neutral" | "alert" | "warning" | "error" | "catastrophe";

type VisualBell = {
	type: BellType;
	message: string;
	key: number;
} | null;

interface IVisualBellCtx {
	visualBell: VisualBell;
	setVisualBell: (type?: BellType, message?: string) => void;
}

const VisualBellContext = createContext<IVisualBellCtx>({
	visualBell: null,
	setVisualBell: () => {},
});

export default VisualBellContext;

interface IVisualBellProviderProps {
	children: JSX.Element;
}

export const VisualBellContextProvider = ({ children }: IVisualBellProviderProps) => {
	const timer = useRef<NodeJS.Timeout | null>(null);
	const [visualBell, setVisualBell] = useState<VisualBell>(null);

	useEffect(() => {
		if (visualBell) {
			if (timer.current && (visualBell.type === "catastrophe" || visualBell.type === "warning")) {
				clearTimeout(timer.current);
			}
			if (visualBell.type !== "catastrophe" && visualBell.type !== "warning") {
				timer.current = setTimeout(() => setVisualBell(null), 5100);
			}
		}
	}, [visualBell?.key]);

	const setVisualBellWithTrigger = (type?: BellType, message?: string) => {
		if (type && message) setVisualBell({ type, message, key: Math.random() });
	};

	const value = useMemo(
		() => ({
			visualBell: visualBell,
			setVisualBell: setVisualBellWithTrigger,
		}),
		[visualBell]
	);

	return <VisualBellContext.Provider value={value}>{children}</VisualBellContext.Provider>;
};
