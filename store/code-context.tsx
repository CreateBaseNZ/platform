import { useRouter } from "next/router";
import { useState, createContext, useMemo, ReactNode, Dispatch, SetStateAction } from "react";
import { TCodeFile } from "../types/code";

/** Coding layouts. */
export type TCodeLayout = "Default" | "Editor" | "Simulation";
/** Coding tabs. */
export type TCodeTab = "Files" | "Blocks";

export const CODE_TABS: TCodeTab[] = ["Files", "Blocks"];

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
	/** ID of file currently open. */
	activeFile: TCodeFile;
	/** Set ID of file currently open. */
	setActiveFile: Dispatch<SetStateAction<TCodeFile>>;
	/** All files belonging to the current subsystem. */
	files: TCodeFile[];
	/** Set all files. */
	setFiles: Dispatch<SetStateAction<TCodeFile[]>>;
};

/**
 * @ignore
 */
const CodeContext = createContext<TCodeContext>({
	codeLayout: "Default",
	setCodeLayout: () => {},
	codeTab: CODE_TABS[0],
	setCodeTab: () => {},
	activeFile: { id: "", name: "", lang: "", code: "", created: new Date(), lastModified: new Date() },
	setActiveFile: () => {},
	files: [],
	setFiles: () => {},
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
	const [codeTab, setCodeTab] = useState<TCodeTab>(CODE_TABS[0]);
	const [activeFile, setActiveFile] = useState({ id: "", name: "", lang: "", code: "", created: new Date(), lastModified: new Date() });
	const [files, setFiles] = useState<TCodeFile[]>([]);

	const value = useMemo(
		() => ({
			codeLayout: codeLayout,
			setCodeLayout: setCodeLayout,
			codeTab: codeTab,
			setCodeTab: setCodeTab,
			activeFile: activeFile,
			setActiveFile: setActiveFile,
			files: files,
			setFiles: setFiles,
		}),
		[codeLayout, setCodeLayout, codeTab, setCodeTab, activeFile, setActiveFile, files, setFiles]
	);

	return <CodeContext.Provider value={value}>{children}</CodeContext.Provider>;
};
