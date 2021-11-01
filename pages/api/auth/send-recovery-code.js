// TODO: Integration - Backend

const DUMMY_SENT = {
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
			content: DUMMY_SENT, // could also return nothing as succeeded will automatically indicate successful verification
		};
	}
	return res.send(data);
}
