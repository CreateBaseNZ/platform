import { AnyAction } from "redux";
import post from "../../utils/api";
import { AppThunk } from "./reducer";

const LOAD_STATE = "code-step/LOAD_STATE";
const SET_LAYOUT = "code-step/SET_LAYOUT";
const SET_TAB = "code-step/SET_TAB";
const RENAME_FILE = "code-step/RENAME_FILE";
const DELETE_FILE = "code-step/DELETE_FILE";
const SET_ACTIVE_FILE = "code-step/SET_ACTIVE_FILE";
const TEXT_FILE_ONCHANGE = "code-step/TEXT_FILE_ONCHANGE";
const SAVE_FILE = "code-step/SAVE_FILE";
const SET_CTX = "code-step/SET_CTX";

const getFilesParam = (projectId: string, subsystem: string) => `${projectId}__${subsystem}__files`;
const getWorkspaceParam = (projectId: string, subsystem: string) => `${projectId}__${subsystem}__workspace`;

export type TCodeLayout = "Default" | "Editor" | "Simulation";
export type TCodeTab = "Files" | "Blocks";
export type TCodeFile = {
	name: string;
	lang: string;
	code: string;
	created: string;
	lastModified: string;
};
export type TOpenTextFile = {
	id: string;
	name: string;
	lang: string;
	lastSavedVersion: number;
	isDirty: boolean;
};

export const CODE_TABS: TCodeTab[] = ["Files", "Blocks"];

export type TCodeStepState = {
	layout: TCodeLayout;
	tab: TCodeTab;
	allFiles: Record<string, TCodeFile>;
	activeFileId: string;
	openTextFiles: TOpenTextFile[];
	ctxMenu: { x: number; y: number; id: string } | undefined;
};

export const DEFAULT_CODE_STEP_STATE: TCodeStepState = {
	layout: "Default",
	tab: "Files",
	allFiles: {},
	activeFileId: "",
	openTextFiles: [],
	ctxMenu: { x: 0, y: 0, id: "" },
};

// create your reducer
const codeStepReducer = (state: TCodeStepState = DEFAULT_CODE_STEP_STATE, action: AnyAction): TCodeStepState => {
	switch (action.type) {
		case LOAD_STATE:
			return { ...state, ...action.payload };
		case SET_LAYOUT:
			return { ...state, layout: action.payload };
		case SET_TAB:
			return { ...state, tab: action.payload };
		case "ADD_FILE":
			return {
				...state,
				allFiles: { ...state.allFiles, [action.payload.id]: action.payload.data },
				openTextFiles: [...state.openTextFiles, { ...action.payload.data, id: action.payload.id, lastSavedVersion: 1, isDirty: false }],
				activeFileId: action.payload.id,
			};
		case RENAME_FILE:
			return { ...state, ...action.payload };
		case DELETE_FILE: {
			return { ...state, ...action.payload };
		}
		case SET_ACTIVE_FILE:
			return { ...state, ...action.payload };
		case TEXT_FILE_ONCHANGE:
			return { ...state, openTextFiles: state.openTextFiles.map((file) => (file.id === action.payload.id ? { ...file, isDirty: file.lastSavedVersion !== action.payload.version } : file)) };
		case SAVE_FILE:
			return { ...state, ...action.payload };
		case SET_CTX:
			return { ...state, ctxMenu: action.payload };
		default:
			return state;
	}
};

export default codeStepReducer;

export const fetchCodeStepData = (profileId: string, projectId: string, subsystem: string): AppThunk => {
	const FILES_PARAM = getFilesParam(projectId, subsystem);
	const WORKSPACE_PARAM = getWorkspaceParam(projectId, subsystem);
	return (dispatch, getState) => {
		console.log(getState());
		post("/api/profile/read-saves", { profileId: profileId, properties: [FILES_PARAM, WORKSPACE_PARAM] }, (data) => {
			console.log(data);
			dispatch({
				type: LOAD_STATE,
				payload: {
					allFiles: data.content[FILES_PARAM] || {},
					openTextFiles:
						data.content[WORKSPACE_PARAM]?.openTextFileIds?.map((id: string) => {
							const file = data.content[FILES_PARAM][id];
							return { id: id, name: file.name, lang: file.lang, lastSavedVersion: 1, isDirty: false };
						}) || [],
					activeFileId: data.content[WORKSPACE_PARAM]?.activeFileId || "",
				},
			});
		});
	};
};

export const saveFile = (profileId: string, projectId: string, subsystem: string, fileId: string, code: string, version: number): AppThunk => {
	return (dispatch, getState) => {
		const { codeStep: state } = getState();
		const { [fileId]: file, ...allFiles } = state.allFiles;
		const newAllFiles = { ...allFiles, [fileId]: { ...file, code: code, lastModified: new Date().toString() } };
		post(
			"/api/profile/update-saves",
			{
				profileId: profileId,
				update: { [getFilesParam(projectId, subsystem)]: newAllFiles },
				date: new Date().toString(),
			},
			() => {
				dispatch({
					type: SAVE_FILE,
					payload: {
						allFiles: newAllFiles,
						openTextFiles: state.openTextFiles.map((f) => (f.id === fileId ? { ...f, lastSavedVersion: version, isDirty: false } : f)),
					},
				});
			}
		);
	};
};

export const renameFile = (profileId: string, projectId: string, subsystem: string, fileId: string, newName: string): AppThunk => {
	return (dispatch, getState) => {
		const { codeStep: state } = getState();
		const allFiles = { ...state.allFiles, [fileId]: { ...state.allFiles[fileId], name: newName, lastModified: new Date().toString() } };
		post(
			"/api/profile/update-saves",
			{
				profileId: profileId,
				update: { [getFilesParam(projectId, subsystem)]: allFiles },
				date: new Date().toString(),
			},
			() => {
				dispatch({
					type: RENAME_FILE,
					payload: {
						allFiles: allFiles,
						openTextFiles: state.openTextFiles.map((file) => (file.id === fileId ? { ...file, name: newName } : file)),
					},
				});
			}
		);
	};
};

export const deleteFile = (profileId: string, projectId: string, subsystem: string, fileId: string): AppThunk => {
	return (dispatch, getState) => {
		const { codeStep: state } = getState();
		const { [fileId]: _, ...allFiles } = state.allFiles;
		post(
			"/api/profile/update-saves",
			{
				profileId: profileId,
				update: { [getFilesParam(projectId, subsystem)]: allFiles },
				date: new Date().toString(),
			},
			() => {
				const openTextFiles = state.openTextFiles.filter((f) => f.id !== fileId);
				dispatch({
					type: DELETE_FILE,
					payload: {
						allFiles: allFiles,
						openTextFiles: openTextFiles,
						activeFileId: openTextFiles.length === 0 || !state.activeFileId ? "" : state.activeFileId === fileId ? openTextFiles[openTextFiles.length - 1].id : state.activeFileId,
						ctxMenu: undefined,
					},
				});
			}
		);
	};
};

export const setActiveFile = (profileId: string, projectId: string, subsystem: string, fileId: string): AppThunk => {
	return (dispatch, getState) => {
		const { codeStep: state } = getState();
		const activeFile = state.allFiles[fileId];
		const isText = activeFile.lang === "js"; // add more text langs here
		// if already open or is not text file, return unchanged
		// else, add to opened text files
		const newOpenTextFiles =
			state.openTextFiles.find((file) => file.id === fileId) || !isText
				? state.openTextFiles
				: [...state.openTextFiles, { id: fileId, name: activeFile.name, lang: activeFile.lang, lastSavedVersion: 1, isDirty: false }];
		dispatch({
			type: SET_ACTIVE_FILE,
			payload: {
				openTextFiles: newOpenTextFiles,
				activeFileId: fileId,
			},
		});
		// dispatch before post (i.e. don't wait for post success)
		// successful saving is non-critical, responsiveness more important
		post("/api/profile/update-saves", {
			profileId: profileId,
			update: {
				[getWorkspaceParam(projectId, subsystem)]: {
					openTextFileIds: newOpenTextFiles.map((f) => f.id),
					activeFileId: fileId,
				},
			},
			date: new Date().toString(),
		});
	};
};
