import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";

async function authenticate(credentials) {
	// Login authentication
	let data;
	try {
		data = (await axios.post("https://createbase.co.nz/login", credentials))["data"];
	} catch (error) {
		data = { status: "error", content: error };
	}
	// Return resulting data
	return data;
}

export default NextAuth({
	session: {
		jwt: true,
	},
	callbacks: {
		async jwt(token, user) {
			if (user) {
				return { user };
			}
			return token;
		},
		async session(session, token) {
			session.user = token.user;
			return session;
		},
	},
	providers: [
		Providers.Credentials({
			async authorize(credentials) {
				// Authenticate the user
				let data = await authenticate(credentials);
				// Validate the authentication
				if (data.status === "failed") {
					throw new Error(data.content);
				} else if (data.status === "error") {
					throw new Error("Oops, something went wrong. Please refresh the page and try again.");
				}
				// Success handler
				return data.content;
			},
		}),
	],
});
