import { useState, createContext, useMemo } from "react";

const UserSessionContext = createContext({
	userSession: {
		email: "",
		firstName: "",
		lastName: "",
		verified: false,
		viewingGroup: false,
		recentGroups: [],
		numOfGroups: 0,
	},
	setUserSession: () => {},
	sessionLoaded: null,
	setSessionLoaded: () => {},
});

export default UserSessionContext;

// TODO change to real default values
const defaultUserSession = {
	email: "louiscflin@gmail.com",
	firstName: "Louis",
	lastName: "Lin",
	verified: true,
	viewingGroup: true,
	recentGroups: [
		{ name: "Botany Downs Secondary School", role: "teacher", numOfUsers: { admins: 1, teachers: 3, students: 78 }, type: "school" },
		{ name: "The Doe's", role: "member", numOfUsers: { members: 5 }, type: "family" },
		{ name: "Rosehill College", role: "admin", numOfUsers: { admins: 2, teachers: 2, students: 64 }, type: "school" },
	],
	numOfGroups: 5,
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
