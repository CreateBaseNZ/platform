import { useState, createContext, useMemo } from "react";

const MainLayoutContext = createContext({
	headerIsCollapsed: false,
	setHeaderIsCollapsed: () => {},
	navIsCollapsed: false,
	setNavIsCollapsed: () => {},
});

export default MainLayoutContext;

export const MainLayoutContextProvider = (props) => {
	const [headerIsCollapsed, setHeaderIsCollapsed] = useState(false);
	const [navIsCollapsed, setNavIsCollapsed] = useState(false);

	const value = useMemo(
		() => ({
			headerIsCollapsed: headerIsCollapsed,
			setHeaderIsCollapsed: setHeaderIsCollapsed,
			navIsCollapsed: navIsCollapsed,
			setNavIsCollapsed: setNavIsCollapsed,
		}),
		[headerIsCollapsed, setHeaderIsCollapsed, navIsCollapsed, setNavIsCollapsed]
	);

	return <MainLayoutContext.Provider value={value}>{props.children}</MainLayoutContext.Provider>;
};
