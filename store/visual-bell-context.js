import { useState, createContext, useMemo, useEffect, useRef } from "react";

const VisualBellContext = createContext({
	visualBell: {},
	setVisualBell: () => {},
});

export default VisualBellContext;

export const VisualBellContextProvider = (props) => {
	const timer = useRef();
	const [visualBell, setVisualBell] = useState({ type: null, message: null });

	useEffect(() => {
		if (visualBell.message) {
			if (timer.current && visualBell.type !== "catastrophe" && visualBell.type !== "warning") {
				clearTimeout(timer.current);
			}
			if (visualBell.type !== "catastrophe" && visualBell.type !== "warning") {
				timer.current = setTimeout(() => setVisualBell({}), 5100);
			}
		}
	}, [visualBell.message]);

	const value = useMemo(
		() => ({
			visualBell: visualBell,
			setVisualBell: setVisualBell,
		}),
		[visualBell]
	);

	return <VisualBellContext.Provider value={value}>{props.children}</VisualBellContext.Provider>;
};
