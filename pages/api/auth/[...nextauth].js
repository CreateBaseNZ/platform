import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export default NextAuth({
	session: {
		jwt: true,
	},
	callbacks: {
		async jwt(token, user) {
			if (user) return { user };
			return token;
		},
		async session(session, token) {
			if (!token) return session;
			session.user = token.user;
			return session;
		},
		async redirect({ url, baseUrl }) {
			return url.startsWith(baseUrl) ? url : baseUrl;
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
	],
	pages: {
		signIn: "/auth/login",
		verifyRequest: "/auth/verify",
	},
});
