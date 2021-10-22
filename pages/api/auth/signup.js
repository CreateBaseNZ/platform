import axios from "axios";

const DUMMY_DATA = {};

export default async function (req, res) {
	if (req.method !== "POST") return;

	if (req.body.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) {
		return res.send({ status: "critical error" });
	}

	let data;
	if (req.body.case === "succeeded") {
		data = { status: "succeeded", content: DUMMY_DATA };
	} else if (req.body.case === "critical error") {
		data = { status: "critical error" };
	} else if (req.body.case === "error") {
		data = { status: "error" };
	} else {
		// simulate a failed response
	}

	return res.send(data);
}
