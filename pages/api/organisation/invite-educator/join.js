// IMPORT ===================================================

import axios from "axios";
import { getSession } from "next-auth/client";

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	// Validate PUBLIC_API_KEY
	if (req.body.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) {
		return res.send({ status: "critical error", content: "" });
	}
	// Create the input data
	const input = {
		email: req.body.input.email,
		eduCode: req.body.input.eduCode,
		orgName: req.body.input.orgName,
		orgId: req.body.input.orgId,
    invCode: req.body.input.invCode
	};
	// TODO: Validate input data
	// Send the request
  let data;
  try {
    data = await 
  } catch (error) {
    
  }
}

// SECONDARY ================================================

// HELPER ===================================================
