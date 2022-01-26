import { useState, createContext, useMemo, ReactNode, Dispatch, SetStateAction } from "react";
import { ModuleList } from "../types/modules";

/** Coding layouts. */
export type TCodeLayout = "Default" | "Editor" | "Simulation";
/** Coding tabs. */
export type TCodeTab = "Blocks" | "Files";

/** Mini node context object. */
export type TProjectContext = {
	/** Coding layout. */
	codeLayout: TCodeLayout;
	/** Set coding layout. */
	setCodeLayout: Dispatch<SetStateAction<TCodeLayout>>;
	/** Coding tab. */
	codeTab: TCodeTab;
	/** Set coding tab. */
	setCodeTab: Dispatch<SetStateAction<TCodeTab>>;
	/** Research module index */
	researchModule: number;
	/** Set research module index. */
	setResearchModule: Dispatch<SetStateAction<number>>;
};

/**
 * @ignore
 */
const ProjectContext = createContext<TProjectContext>({
	codeLayout: "Default",
	setCodeLayout: () => {},
	codeTab: "Blocks",
	setCodeTab: () => {},
	researchModule: -1,
	setResearchModule: () => {},
});

export default ProjectContext;

interface Props {
	children: ReactNode;
}

/**
 * @ignore
 */
export const ProjectContextProvider = ({ children }: Props) => {
	const [codeLayout, setCodeLayout] = useState<TCodeLayout>("Default");
	const [codeTab, setCodeTab] = useState<TCodeTab>("Blocks");
	const [researchModule, setResearchModule] = useState(-1);

	const value = useMemo(
		() => ({
			codeLayout: codeLayout,
			setCodeLayout: setCodeLayout,
			codeTab: codeTab,
			setCodeTab: setCodeTab,
			researchModule: researchModule,
			setResearchModule: setResearchModule,
		}),
		[codeLayout, setCodeLayout, codeTab, setCodeTab, researchModule, setResearchModule]
	);

	return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};
