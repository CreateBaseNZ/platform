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

	// TODO: INTEGRATION
	// Point of integration for signup
	// [TEST METHODS]
	// Go to http://localhost:3000/signup
	// Create an account with a unique email. (success)
	// Create an account with an existing email. (failed)
	// [REQUIREMENT] Input Object
	const input = {
		accountId: session.user,
	};
	console.log(input); // Ensure that the input is correct and that there are no undefined properties
	// Backend Interface
	// [REQUIREMENT] Route
	// Simulation
	const status = "succeeded"; // succeeded. failed 1, failed 2
	let data;
	try {
		data = (await axios.post("/api/session", { PUBLIC_API_KEY: process.env.PUBLIC_API_KEY, input, status }))["data"];
	} catch (error) {
		data.status = "error";
	} finally {
		// Critical Error and Error and Failed Hanlders
		// [REQUIREMENT] Failed Handler
		// [REQUIREMENT] Success Handler
		setUserSession((state) => ({ ...state, ...data.content }));
	}

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
