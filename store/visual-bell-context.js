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
			if (timer.current && bell.type !== "catastrophe") {
				clearTimeout(timer.current);
			}
			if (bell.type !== "catastrophe") {
				timer.current = setTimeout(() => setBell({}), 4100);
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
