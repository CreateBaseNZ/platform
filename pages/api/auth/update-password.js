// TODO: Integration - Backend

const DUMMY_CONTENT = { done: true };

export default async function (req, res) {
	if (req.method !== "POST") return;
	if (req.body.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) {
		return res.send({ status: "critical error" });
	}
	let data;
	if (req.body.status === "succeeded") {
		data = {
			status: "succeeded",
			content: DUMMY_CONTENT, // content not required; returning just the succeeded status is sufficient
		};
	} else if (req.body.status === "failed 1") {
		data = {
			status: "failed",
			content: "incorrect",
		};
	}
	return res.send(data);
}
