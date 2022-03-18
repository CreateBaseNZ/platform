import { AnyAction } from "redux";

export type TCodeLayout = "Default" | "Editor" | "Simulation";
export type TCodeTab = "Files" | "Blocks";
export type TCodeFile = {
	id: string;
	name: string;
	lang: string;
	code: string;
	created: Date;
	lastModified: Date;
};
export type TOpenTextFile = {
	id: string;
	name: string;
	lang: string;
	lastSavedVersion: number | undefined;
	isDirty: boolean;
};

export const CODE_TABS: TCodeTab[] = ["Files", "Blocks"];

export type TCodeStepState = {
	layout: TCodeLayout;
	tab: TCodeTab;
	allFiles: TCodeFile[];
	activeFile: TCodeFile;
	openTextFiles: TOpenTextFile[];
	ctxMenu: { x: number; y: number; id: string } | undefined;
};

export const DEFAULT_CODE_STEP_STATE: TCodeStepState = {
	layout: "Default",
	tab: "Files",
	allFiles: [],
	activeFile: { id: "", name: "", lang: "js", code: "", created: new Date(), lastModified: new Date() },
	openTextFiles: [],
	ctxMenu: { x: 0, y: 0, id: "" },
};

// create your reducer
const codeStepReducer = (state: TCodeStepState = DEFAULT_CODE_STEP_STATE, action: AnyAction): TCodeStepState => {
	switch (action.type) {
		case "INIT_EDITOR":
			return { ...state, ...action.payload };
		case "SET_LAYOUT":
			return { ...state, layout: action.payload };
		case "SET_TAB":
			return { ...state, tab: action.payload };
		case "ADD_FILE":
			return {
				...state,
				allFiles: [...state.allFiles, action.payload],
				openTextFiles: [...state.openTextFiles, { id: action.payload.id, name: action.payload.name, lang: action.payload.lang, lastSavedVersion: 1, isDirty: false }],
				activeFile: action.payload,
			};
		case "DELETE_FILE": {
			const _openTextFiles = state.openTextFiles.filter((f) => f.id !== action.payload);
			return {
				...state,
				allFiles: state.allFiles.filter((f) => f !== action.payload),
				openTextFiles: _openTextFiles,
				activeFile: state.activeFile.id === action.payload.id ? (state.allFiles.find((file) => file.id === _openTextFiles[0].id) as TCodeFile) : state.activeFile,
				ctxMenu: undefined,
			};
		}
		case "SET_ACTIVE_FILE":
			return { ...state, activeFile: state.allFiles.find((file) => file.id === action.payload) as TCodeFile };
		case "TEXT_FILE_ONCHANGE": {
			return { ...state, openTextFiles: state.openTextFiles.map((file) => (file.id === action.payload.id ? { ...file, isDirty: file.lastSavedVersion !== action.payload.version } : file)) };
		}
		case "SAVE_TEXT_FILE":
			return {
				...state,
				allFiles: state.allFiles.map((file) => (file.id === action.payload.id ? { ...file, code: action.payload.code, lastModified: new Date() } : file)),
				openTextFiles: state.openTextFiles.map((file) => (file.id === action.payload.id ? { ...file, lastSavedVersion: action.payload.version, isDirty: false } : file)),
			};
		case "SET_CTX":
			return { ...state, ctxMenu: action.payload };
		default:
			return state;
	}
};

export default codeStepReducer;
