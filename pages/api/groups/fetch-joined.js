// TODO integration

const DUMMY_GROUPS = [
	{ id: "bdsc", name: "Botany Downs Secondary School", role: "teacher", numOfUsers: { admins: 1, teachers: 3, students: 78 }, type: "school" },
	{ id: "rc", name: "Rosehill College", role: "admin", numOfUsers: { admins: 2, teachers: 2, students: 64 }, type: "school" },
	{ id: "spp", name: "Shelly Park Primary", role: "student", numOfUsers: { admins: 1, teachers: 1, students: 34 }, type: "school" },
	{ id: "school_trial", name: "School trial as an admin", role: "admin", numOfUsers: { admins: 1, teachers: 0, students: 0 }, type: "school" },
	{ id: "does", name: "The Doe's", role: "member", numOfUsers: { members: 5 }, type: "family" },
	{ id: "family_trial", name: "Family trial as an admin", role: "admin", numOfUsers: { members: 1 }, type: "family" },
];

export default async function (req, res) {
	if (req.method !== "POST") return;
	if (req.body.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) {
		return res.send({ status: "critical error" });
	}
	let data;
	if (req.body.status === "succeeded") {
		data = {
			status: "succeeded",
			content: DUMMY_GROUPS,
		};
	}
	// no failure modes for this route
	return res.send(data);
}
