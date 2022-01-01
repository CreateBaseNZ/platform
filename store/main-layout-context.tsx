import { useState, createContext, useMemo, Dispatch, SetStateAction } from "react";

interface IMainLayoutCtx {
	headerIsCollapsed: boolean;
	setHeaderIsCollapsed: Dispatch<SetStateAction<boolean>>;
	navIsCollapsed: boolean;
	setNavIsCollapsed: Dispatch<SetStateAction<boolean>>;
}

const MainLayoutContext = createContext<IMainLayoutCtx>({
	headerIsCollapsed: false,
	setHeaderIsCollapsed: () => {},
	navIsCollapsed: false,
	setNavIsCollapsed: () => {},
});

export default MainLayoutContext;

interface IMainLayoutProviderProps {
	children: JSX.Element | JSX.Element[];
}

export const MainLayoutContextProvider = ({ children }: IMainLayoutProviderProps) => {
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

	return <MainLayoutContext.Provider value={value}>{children}</MainLayoutContext.Provider>;
};
