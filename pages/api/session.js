// TODO: Integration - Backend

const DUMMY_SESSION = {
	accountId: "accountId123",
	profileId: "profileId123",
	email: "louiscflin@gmail.com",
	firstName: "Louis",
	lastName: "Lin",
	verified: true,
	isViewingGroup: false,
	recentGroups: [
		{ id: "123", name: "Botany Downs Secondary School", role: "teacher", numOfUsers: { admins: 1, teachers: 3, students: 78 }, type: "school" },
		{ id: "456", name: "The Doe's", role: "member", numOfUsers: { members: 5 }, type: "family" },
		{ id: "789", name: "Rosehill College", role: "admin", numOfUsers: { admins: 2, teachers: 2, students: 64 }, type: "school" },
	],
	numOfGroups: 5,
};

export default async function (req, res) {
	if (req.method !== "POST") return;
	if (req.body.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) {
		return res.send({ status: "critical error" });
	}
	let data;
	if (req.body.status === "succeeded") {
		data = {
			status: "succeeded",
			content: DUMMY_SESSION,
		};
	}
	// no failure modes for this route
	return res.send(data);
}
