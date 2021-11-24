import { useState, createContext, useMemo } from "react";

const ClassesContext = createContext({
	classObjects: {
		id: "",
		name: "",
		teachers: [],
		numOfStudents: 0,
	},
	setClassObjects: () => {},
});

export default ClassesContext;

export const ClassesContextProvider = (props) => {
	const [classObjects, setClassObjects] = useState(null);

	const value = useMemo(
		() => ({
			classObjects: classObjects,
			setClassObjects: setClassObjects,
		}),
		[classObjects, setClassObjects]
	);

	return <ClassesContext.Provider value={value}>{props.children}</ClassesContext.Provider>;
};
