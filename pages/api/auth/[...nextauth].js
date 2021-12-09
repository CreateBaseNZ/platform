import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { signIn } from "next-auth/react";

export default NextAuth({
	session: {
		jwt: true,
	},
	callbacks: {
		async jwt({ token, user, account, profile, isNewUser }) {
			if (user) return { user };
			return token;
		},
		async session({ session, token, user }) {
			if (!token) return session;
			session.user = token.user;
			return session;
		},
		async signIn({ account, profile }) {
			if (account.provider === "google") {
				if (!profile.email_verified) return false;
			} else if (account.provider === "credentials") {
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
				console.log(data.content);
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
});
