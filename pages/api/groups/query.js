// TODO integration
// TODO decide how to handle already joined school

const DUMMY_ALL_SCHOOLS = [
	{ id: "bdsc", name: "Botany Downs Secondary School", role: "teacher", numOfUsers: { admins: 1, teachers: 3, students: 78 }, type: "school", address: { city: "Auckland", country: "New Zealand" } },
	{ id: "rc", name: "Rosehill College", role: "admin", numOfUsers: { admins: 2, teachers: 2, students: 64 }, type: "school", address: { city: "Auckland", country: "New Zealand" } },
	{ id: "spp", name: "Shelly Park Primary", role: "student", numOfUsers: { admins: 1, teachers: 1, students: 34 }, type: "school", address: { city: "Auckland", country: "New Zealand" } },
];

const getQueriedGroups = (query) => {
	console.log(query);
	return DUMMY_ALL_SCHOOLS.filter((group) => group.name.toLowerCase().includes(query.toLowerCase()));
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
			content: getQueriedGroups(req.body.input.query),
		};
	}
	// no failure modes for this route
	return res.send(data);
}
