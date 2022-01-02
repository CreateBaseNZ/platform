import { useState, createContext, useMemo, Dispatch, SetStateAction, ReactNode } from "react";

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

type MainLayoutProviderProps = {
	children: ReactNode;
};

export const MainLayoutContextProvider = ({ children }: MainLayoutProviderProps) => {
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
