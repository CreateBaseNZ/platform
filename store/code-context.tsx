import { useRouter } from "next/router";
import { useState, createContext, useMemo, ReactNode, Dispatch, SetStateAction, useEffect } from "react";
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
	activeFileId: string;
	/** Set ID of file currently open. */
	setActiveFileId: Dispatch<SetStateAction<string>>;
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
	activeFileId: "",
	setActiveFileId: () => {},
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
	const [activeFileId, setActiveFileId] = useState("");
	const [files, setFiles] = useState<TCodeFile[]>([
		{ id: "test", name: "test", lang: "js", code: "test", created: new Date(), lastModified: new Date() },
		{ id: "test2", name: "test2", lang: "js", code: "test2", created: new Date(), lastModified: new Date() },
	]);

	const value = useMemo(
		() => ({
			codeLayout: codeLayout,
			setCodeLayout: setCodeLayout,
			codeTab: codeTab,
			setCodeTab: setCodeTab,
			activeFileId: activeFileId,
			setActiveFileId: setActiveFileId,
			files: files,
			setFiles: setFiles,
		}),
		[codeLayout, setCodeLayout, codeTab, setCodeTab, activeFileId, setActiveFileId, files, setFiles]
	);

	return <CodeContext.Provider value={value}>{children}</CodeContext.Provider>;
};
