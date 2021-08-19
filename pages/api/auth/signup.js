import axios from "axios";

async function handler(req, res) {
  if (req.method !== "POST") return;
  // TO DO: Validate incoming input

  // Send the signup request
  let data;
  try {
    data = (await axios.post("https://createbase.co.nz/signup", req.body))[
      "data"
    ];
  } catch (error) {
    data = { status: "error", content: error };
  }
  // Return the resulting data
  return res.send(data);
}

export default handler;
