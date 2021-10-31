import { useSession } from "next-auth/react";
import { useState, createContext, useMemo, useEffect } from "react";

const UserSessionContext = createContext({
	userSession: {},
	setUserSession: () => {},
});

export default UserSessionContext;

const DUMMY_DATA = {
	email: "louiscflin@gmail.com",
	firstName: "Louis",
	lastName: "Lin",
	verified: true,
	isViewingGroup: true,
	recentGroups: [
		{ _id: "123", name: "Botany Downs Secondary School", role: "teacher", numOfUsers: { admins: 1, teachers: 3, students: 78 }, type: "school" },
		{ _id: "456", name: "The Doe's", role: "member", numOfUsers: { members: 5 }, type: "family" },
		{ _id: "789", name: "Rosehill College", role: "admin", numOfUsers: { admins: 2, teachers: 2, students: 64 }, type: "school" },
	],
	numOfGroups: 5,
};

export const UserSessionContextProvider = (props) => {
	const { data: session, status } = useSession();
	const [userSession, setUserSession] = useState({});

	console.log(session);

	useEffect(() => {
		if (status !== "loading" && session) {
			setUserSession((state) => ({ ...state, ...session.user }));
		}
	}, [status, session]);

	const value = useMemo(
		() => ({
			userSession: userSession,
			setUserSession: setUserSession,
		}),
		[userSession, setUserSession]
	);

	return <UserSessionContext.Provider value={value}>{props.children}</UserSessionContext.Provider>;
};
