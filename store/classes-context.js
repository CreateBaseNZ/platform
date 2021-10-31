import { useState, createContext, useMemo } from "react";

const ClassesContext = createContext({
	classSession: {
		name: "",
		teachers: [],
		numOfStudents: 0,
	},
	setClassSession: () => {},
});

export default ClassesContext;

const DUMMY = { id: "abc123", name: "Room 23", teachers: ["Mrs Applecrumb"], numOfStudents: 23 };

export const ClassesContextProvider = (props) => {
	const [classSession, setClassSession] = useState(DUMMY);

	const value = useMemo(
		() => ({
			classSession: classSession,
			setClassSession: setClassSession,
		}),
		[classSession, setClassSession]
	);

	return <ClassesContext.Provider value={value}>{props.children}</ClassesContext.Provider>;
};
