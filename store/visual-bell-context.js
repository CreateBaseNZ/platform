import { useState, createContext, useMemo, useEffect, useRef } from "react";

const VisualBellContext = createContext({
	bell: {},
	setBell: () => {},
});

export default VisualBellContext;

export const VisualBellContextProvider = (props) => {
	const timer = useRef();
	const [bell, setBell] = useState({});

	useEffect(() => {
		if (bell.message) {
			if (timer.current && bell.type !== "catastrophe" && bell.type !== "warning") {
				clearTimeout(timer.current);
			}
			if (bell.type !== "catastrophe" && bell.type !== "warning") {
				timer.current = setTimeout(() => setBell({}), 5100);
			}
		}
	}, [bell.message]);

	const value = useMemo(
		() => ({
			bell: bell,
			setBell: setBell,
		}),
		[bell]
	);

	return <VisualBellContext.Provider value={value}>{props.children}</VisualBellContext.Provider>;
};
