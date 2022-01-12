import { useState, createContext, useMemo, Dispatch, SetStateAction, ReactNode } from "react";

/** Main layout context object. */
export type MainLayoutCtx = {
	/** `true` if the header is collapsed, `false` otherwise. */
	headerIsCollapsed: boolean;
	/** Sets {@link headerIsCollapsed}. */
	setHeaderIsCollapsed: Dispatch<SetStateAction<boolean>>;
	/** `true` if the nav is collapsed, `false` otherwise. */
	navIsCollapsed: boolean;
	/** Sets {@link navIsCollapsed}. */
	setNavIsCollapsed: Dispatch<SetStateAction<boolean>>;
};

/**
 * @ignore
 */
const MainLayoutContext = createContext<MainLayoutCtx>({
	headerIsCollapsed: false,
	setHeaderIsCollapsed: () => {},
	navIsCollapsed: false,
	setNavIsCollapsed: () => {},
});

export default MainLayoutContext;

type MainLayoutProviderProps = {
	children: ReactNode;
};

/**
 * @ignore
 */
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
