import { useState, createContext, useMemo } from "react";

const UserSessionContext = createContext({
	userSession: {
		email: "",
		firstName: "",
		lastName: "",
		view: null,
		recentGroups: [],
	},
	setUserSession: () => {},
});

export default UserSessionContext;

// TODO change to real default values
const defaultUserSession = {
	email: "louiscflin@gmail.com",
	firstName: "Louis",
	lastName: "Lin",
	view: {
		groupType: "school",
		userType: "teacher",
	},
	recentGroups: [
		{ name: "Somerville Intermediate School", type: "school" },
		{ name: "Lin NZ", type: "family" },
		{ name: "Rosehill College", type: "school" },
	],
};

export const UserSessionContextProvider = (props) => {
	const [userSession, setUserSession] = useState(defaultUserSession);

	const value = useMemo(
		() => ({
			userSession: userSession,
			setUserSession: setUserSession,
		}),
		[userSession, setUserSession]
	);

	return <UserSessionContext.Provider value={value}>{props.children}</UserSessionContext.Provider>;
};
