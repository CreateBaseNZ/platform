import { useRouter } from "next/router";
import { useState, createContext, useMemo, ReactNode, Dispatch, SetStateAction, useEffect } from "react";

/** Coding layouts. */
export type TCodeLayout = "Default" | "Editor" | "Simulation";
/** Coding tabs. */
export type TCodeTab = "Blocks" | "Files";

/** Mini node context object. */
export type TCodeContext = {
	/** Coding layout. */
	codeLayout: TCodeLayout;
	/** Set coding layout. */
	setCodeLayout: Dispatch<SetStateAction<TCodeLayout>>;
	/** Coding tab. */
	codeTab: TCodeTab;
	/** Set coding tab. */
	setCodeTab: Dispatch<SetStateAction<TCodeTab>>;
};

/**
 * @ignore
 */
const CodeContext = createContext<TCodeContext>({
	codeLayout: "Default",
	setCodeLayout: () => {},
	codeTab: "Blocks",
	setCodeTab: () => {},
});

export default CodeContext;

interface Props {
	children: ReactNode;
}

/**
 * @ignore
 */
export const CodeContextProvider = ({ children }: Props) => {
	const router = useRouter();
	const [codeLayout, setCodeLayout] = useState<TCodeLayout>("Default");
	const [codeTab, setCodeTab] = useState<TCodeTab>("Blocks");

	useEffect(() => {
		if (!router.isReady) return;
	}, [router.isReady, router.query.module]);

	const value = useMemo(
		() => ({
			codeLayout: codeLayout,
			setCodeLayout: setCodeLayout,
			codeTab: codeTab,
			setCodeTab: setCodeTab,
		}),
		[codeLayout, setCodeLayout, codeTab, setCodeTab]
	);

	return <CodeContext.Provider value={value}>{children}</CodeContext.Provider>;
};
