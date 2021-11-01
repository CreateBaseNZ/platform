// TODO integration

const DUMMY_VERIFY = {
	verified: true,
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
			content: DUMMY_VERIFY, // could also return nothing as succeeded will automatically indicate successful verification
		};
	} else if (req.body.status === "failed 1") {
		data = {
			status: "failed",
			content: "incorrect",
		};
	} else if (req.body.status === "failed 2") {
		data = {
			status: "failed",
			content: "expired",
		};
	}
	return res.send(data);
}
