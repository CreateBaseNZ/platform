import axios from "axios";
import { getSession } from "next-auth/client";

function validate(input, date) {
  return new Promise(async (resolve, reject) => {
    let valid = true;
    let errors = [];
    // Validations
    if (!input.length) {
      valid = false;
      errors.push("Please input the data properties to update.");
    }
    // OPTIONAL: Add additional validation logics
    // Handler
    if (valid) {
      return resolve();
    } else {
      return reject({ status: "failed", content: errors });
    }
  });
}

export default async function (req, res) {
  if (req.method !== "POST") return;
  // Fetch the user's session detail
  const session = await getSession({ req });
  // Check if there is a logged in user
  if (!session) {
    return res.send({
      status: "failed",
      content: "There's no logged in user.",
    });
  }
  const user = session.user;
  // Perform input data validation
  const input = req.body.input;
  try {
    await validate(input);
  } catch (data) {
    return res.send(data);
  }
  // Send the read request
  let data;
  try {
    data = (
      await axios.post("https://createbase.co.nz/user-data/read", {
        user,
        input,
      })
    )["data"];
  } catch (error) {
    data = { status: "error", content: error };
  }
  // Return resulting data
  return res.send(data);
}
