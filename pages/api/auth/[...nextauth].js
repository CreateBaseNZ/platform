import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

export default NextAuth({
	session: {
		jwt: true,
	},
	callbacks: {
		async jwt({ token, user, account, profile, isNewUser }) {
			if (account && user) {
				return { user: { provider: account.provider, accountId: user.id } };
			}
			return token;
		},
		async session({ session, user, token }) {
			if (!token) return session;
			session.user = token.user;
			return session;
		},
		async signIn({ user, account, profile, email, credentials }) {
			if (account.provider === "google") {
				if (!profile.email_verified) return false;
				// Construct the input object
				const url = process.env.ROUTE_URL + "/login/google-auth";
				const keys = { PRIVATE_API_KEY: process.env.PRIVATE_API_KEY };
				const input = { id: user.id, email: user.email, name: { first: profile.given_name, last: profile.family_name } };
				let result;
				try {
					result = (await axios.post(url, { ...keys, input }))["data"];
				} catch (error) {
					result = { status: "error", content: error };
				}
				if (result.status !== "succeeded") return false;
				if (result.content === "new") {
					try {
						await sendEmail({ accountId: user.id, email: user.email });
					} catch (error) {
						return false;
					}
				}
				user = { accountId: user.id, provider: "google" };
				return true;
			} else if (account.provider === "credentials") {
				user = { accountId: user.id, provider: "credentials" };
				return true;
			}
		},
	},
	providers: [
		CredentialsProvider({
			async authorize(credentials) {
				// Validate PUBLIC_API_KEY
				if (credentials.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) {
					throw new Error(JSON.stringify({ status: "critical error" }));
				}
				const input = { email: credentials.user, password: credentials.password };
				// Perform authentication based on the type
				let data;
				try {
					data = (await axios.post(process.env.ROUTE_URL + "/login", { PRIVATE_API_KEY: process.env.PRIVATE_API_KEY, input }))["data"];
				} catch (error) {
					return res.send({ status: "error", content: error });
				}
				// Validate the authentication
				if (data.status === "critical error" || data.status === "error" || data.status === "failed") {
					throw new Error(JSON.stringify(data));
				}
				// Success handler
				return data.content;
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	pages: {
		signIn: "/auth/login",
		error: "/auth/login",
		verifyRequest: "/auth/verify",
	},
	secret: process.env.NEXTAUTH_SECRET,
});

// HELPERS ==================================================

function sendEmail({ accountId, email }) {
	return new Promise(async (resolve, reject) => {
		// Construct the input object
		const input = {
			user: { accountId, provider: "google" },
			option: { recipient: email, receive: "welcome", notification: "onboarding", tone: "friendly" },
		};
		// Send the processing request
		let data;
		try {
			data = (await axios.post(process.env.ROUTE_URL + "/mail/send-email", { PRIVATE_API_KEY: process.env.PRIVATE_API_KEY, input }))["data"];
		} catch (error) {
			data = { status: "error", content: error };
		}
		// Error handler
		if (data.status !== "succeeded") return reject({ status: "error" });
		// Success handler
		return resolve();
	});
}

// END ======================================================
