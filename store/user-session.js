import { useSession } from "next-auth/react";
import { useState, createContext, useMemo, useEffect } from "react";

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
		{ _id: "123", name: "Botany Downs Secondary School", role: "teacher", numOfUsers: { admins: 1, teachers: 3, students: 78 }, type: "school" },
		{ _id: "456", name: "The Doe's", role: "member", numOfUsers: { members: 5 }, type: "family" },
		{ _id: "789", name: "Rosehill College", role: "admin", numOfUsers: { admins: 2, teachers: 2, students: 64 }, type: "school" },
	],
	numOfGroups: 5,
};

export const UserSessionContextProvider = (props) => {
	const { data, status } = useSession();
	const [sessionLoaded, setSessionLoaded] = useState(true);
	const [userSession, setUserSession] = useState({});

	useEffect(() => {
		if (status !== "loading") {
			console.log(data);
			setSessionLoaded(true);
			setUserSession(data);
		}
	}, [data, status]);

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
