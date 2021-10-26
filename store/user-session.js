import { useState, createContext, useMemo } from "react";

const UserSessionContext = createContext({
	userSession: {
		email: "",
		firstName: "",
		lastName: "",
		verified: true,
		view: null,
		recentGroups: [],
	},
	setUserSession: () => {},
	sessionLoaded: null,
	setSessionLoaded: () => {},
});

export default UserSessionContext;

// TODO change to real default values
const defaultUserSession = {
	// email: "louiscflin@gmail.com",
	firstName: "Louis",
	lastName: "Lin",
	verified: true,
	view: {
		groupType: "school",
		userType: "teacher",
		groupName: "Somerville Intermediate School",
	},
	recentGroups: [
		{ name: "Somerville Intermediate School", type: "school" },
		{ name: "Lin NZ", type: "family" },
		{ name: "Rosehill College", type: "school" },
	],
};

export const UserSessionContextProvider = (props) => {
	const [sessionLoaded, setSessionLoaded] = useState(true);
	const [userSession, setUserSession] = useState(defaultUserSession);

	const value = useMemo(
		() => ({
			userSession: userSession,
			setUserSession: setUserSession,
			sessionLoaded: sessionLoaded,
			setSessionLoaded: setSessionLoaded,
		}),
		[userSession, setUserSession, sessionLoaded, setSessionLoaded]
	);

	return <UserSessionContext.Provider value={value}>{props.children}</UserSessionContext.Provider>;
};
