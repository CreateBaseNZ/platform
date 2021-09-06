import { useEffect, useState } from "react";
import { useSession } from "next-auth/client";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { signOut } from "next-auth/client";
import { SecondaryButton } from "../components/UI/Buttons";
import { initSession } from "../utils/authHelpers";

import WhiteLogo, { FBIcon, IGIcon, TwitterIcon, YTIcon } from "/components/UI/Icons";

import axios from "axios";

import classes from "/styles/Index.module.scss";

const Index = ({ setLoaded }) => {
	const [session, loading] = useSession();
	const [user, setUser] = useState({});
	const [showHelper, setShowHelper] = useState(false);

	useEffect(async () => {
		setLoaded(true);

		// EXAMPLE: Create an organisation as an educator
		// const input = {
		// 	name: "CreateBase School",
		// 	type: "school",
		//	city: "auckland",
		// 	country: "new zealand",
		// 	date: new Date().toString(),
		// 	metadata: { id: "42069" },
		// };
		// let data;
		// try {
		// 	data = (await axios.post("/api/organisation/create", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input }))["data"];
		// } catch (error) {
		// 	if (error.response) {
		// 		data = error.response.data;
		// 	} else if (error.request) {
		// 		data = { status: "error", content: error.request };
		// 	} else {
		// 		data = { status: "error", content: error.message };
		// 	}
		// }
		// console.log(data);

		// EXAMPLE: Read organisation data for the admin console page
		// let data;
		// try {
		// 	data = (await axios.post("/api/organisation/admin/read", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY }))["data"];
		// } catch (error) {
		// 	if (error.response) {
		// 		data = error.response.data;
		// 	} else if (error.request) {
		// 		data = { status: "error", content: error.request };
		// 	} else {
		// 		data = { status: "error", content: error.message };
		// 	}
		// }
		// console.log(data);

		// EXAMPLE: Read organisation data for the account settings page
		// let data;
		// try {
		// 	data = (await axios.post("/api/organisation/read-account", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY }))["data"];
		// } catch (error) {
		// 	if (error.response) {
		// 		data = error.response.data;
		// 	} else if (error.request) {
		// 		data = { status: "error", content: error.request };
		// 	} else {
		// 		data = { status: "error", content: error.message };
		// 	}
		// }
		// console.log(data);

		// EXAMPLE: Join an existing organisation as an educator
		// const input = {
		// 	name: "CreateBase School",
		// 	code: "32TjqU",
		// 	type: "school",
		// 	country: "new zealand",
		// 	date: new Date().toString(),
		// 	metadata: { id: "42069" },
		// };
		// let data;
		// try {
		// 	data = (await axios.post("/api/organisation/join-educator", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input }))["data"];
		// } catch (error) {
		// 	if (error.response) {
		// 		data = error.response.data;
		// 	} else if (error.request) {
		// 		data = { status: "error", content: error.request };
		// 	} else {
		// 		data = { status: "error", content: error.message };
		// 	}
		// }
		// console.log(data);

		// EXAMPLE: Read data
		// const input = { properties: ["displayName"], saves: ["test", "test2"] };
		// let data;
		// try {
		// 	data = (await axios.post("/api/profile/read", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input }))["data"];
		// } catch (error) {
		// 	if (error.response) {
		// 		data = error.response.data;
		// 	} else if (error.request) {
		// 		data = { status: "error", content: error.request };
		// 	} else {
		// 		data = { status: "error", content: error.message };
		// 	}
		// }
		// console.log(data);

		// EXAMPLE: Update data
		// const input = { date: new Date().toString(), displayName: "Test", saves: { test2: "test2" } };
		// let data;
		// try {
		// 	data = (await axios.post("/api/profile/update", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input }))["data"];
		// } catch (error) {
		// 	if (error.response) {
		// 		data = error.response.data;
		// 	} else if (error.request) {
		// 		data = { status: "error", content: error.request };
		// 	} else {
		// 		data = { status: "error", content: error.message };
		// 	}
		// }
		// console.log(data);

		// EXAMPLE: Delete data
		// const input = { date: new Date().toString(), saves: ["test2"] };
		// let data;
		// try {
		// 	data = (await axios.post("/api/profile/delete-saves", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input }))["data"];
		// } catch (error) {
		// 	if (error.response) {
		// 		data = error.response.data;
		// 	} else if (error.request) {
		// 		data = { status: "error", content: error.request };
		// 	} else {
		// 		data = { status: "error", content: error.message };
		// 	}
		// }
		// console.log(data);

		// EXAMPLE: Admin create an educator
		// const input = { username: "student1", password: "Student1!", status: "free", date: new Date().toString(), displayName: "Student One" };
		// let data;
		// try {
		// 	data = (await axios.post("/api/organisation/admin/create-learner", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input }))["data"];
		// } catch (error) {
		// 	if (error.response) {
		// 		data = error.response.data;
		// 	} else if (error.request) {
		// 		data = { status: "error", content: error.request };
		// 	} else {
		// 		data = { status: "error", content: error.message };
		// 	}
		// }
		// console.log(data);

		// EXAMPLE: Educator Signup and Join an Organisation
		// const input = {
		// 	// educator data
		// 	email: "newtestemail2@gmail.com",
		// 	username: "newtestuser2",
		// 	displayName: "New Test User",
		// 	password: "Testuser1!",
		// 	// organisation data
		// 	name: "CreateBase School",
		// 	code: "32TjqU",
		// 	type: "school",
		// 	country: "new zealand",
		// 	metadata: { id: "42069" },
		// 	// other data
		// 	date: new Date().toString(),
		// };
		// let data;
		// try {
		// 	data = (await axios.post("/api/signup/educator-organisation", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input }))["data"];
		// } catch (error) {
		// 	if (error.response) {
		// 		data = error.response.data;
		// 	} else if (error.request) {
		// 		data = { status: "error", content: error.request };
		// 	} else {
		// 		data = { status: "error", content: error.message };
		// 	}
		// }
		// console.log(data);

		// EXAMPLE: Learner Signup and Join an Organisation
		// const input = {
		// 	// learner data
		// 	username: "newtestuser3",
		// 	displayName: "New Test User",
		// 	password: "Testuser1!",
		// 	// organisation data
		// 	name: "CreateBase School",
		// 	code: "BlFu9K",
		// 	type: "school",
		// 	country: "new zealand",
		// 	metadata: { id: "42069" },
		// 	// other data
		// 	date: new Date().toString(),
		// };
		// let data;
		// try {
		// 	data = (await axios.post("/api/signup/learner-organisation", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input }))["data"];
		// } catch (error) {
		// 	if (error.response) {
		// 		data = error.response.data;
		// 	} else if (error.request) {
		// 		data = { status: "error", content: error.request };
		// 	} else {
		// 		data = { status: "error", content: error.message };
		// 	}
		// }
		// console.log(data);

		// let data;
		// try {
		// 	data = (await axios.post("/api/auth/account-verification-email", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY }))["data"];
		// } catch (error) {
		// 	if (error.response) {
		// 		data = error.response.data;
		// 	} else if (error.request) {
		// 		data = { status: "error", content: error.request };
		// 	} else {
		// 		data = { status: "error", content: error.message };
		// 	}
		// }
		// console.log(data);

		// const input = { code: "JzwdoH" };
		// let data;
		// try {
		// 	data = (await axios.post("/api/auth/account-verify", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input }))["data"];
		// } catch (error) {
		// 	if (error.response) {
		// 		data = error.response.data;
		// 	} else if (error.request) {
		// 		data = { status: "error", content: error.request };
		// 	} else {
		// 		data = { status: "error", content: error.message };
		// 	}
		// }
		// console.log(data);

		// let data;
		// try {
		// 	data = (await axios.post("/api/auth/send-email-test", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY }))["data"];
		// } catch (error) {
		// 	if (error.response) {
		// 		data = error.response.data;
		// 	} else if (error.request) {
		// 		data = { status: "error", content: error.request };
		// 	} else {
		// 		data = { status: "error", content: error.message };
		// 	}
		// }
		// console.log(data);

		// const input = { email: "carlvelasco96@gmail.com" };
		// let data;
		// try {
		// 	data = (await axios.post("/api/auth/reset-password-email", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input }))["data"];
		// } catch (error) {
		// 	data = { status: "error", content: error };
		// }
		// if (data.status === "critical error") {
		// 	// Critical Error Handling
		// } else if (data.status === "error") {
		// 	// Error Handling
		// } else if (data.status === "failed") {
		// 	// Failed Handling
		// }

		// EXAMPLE: Reset the password
		// const input = { email: "carlvelasco96@gmail.com", password: "Newpassword1!", code: "d78Vvy" };
		// let data;
		// try {
		// 	data = (await axios.post("/api/auth/reset-password", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input }))["data"];
		// } catch (error) {
		// 	data = { status: "error", content: error };
		// }
		// if (data.status === "critical error") {
		// 	// Critical Error Handling
		// } else if (data.status === "error") {
		// 	// Error Handling
		// } else if (data.status === "failed") {
		// 	// Failed Handling
		// }

		// let data;
		// try {
		// 	data = (await axios.post("/api/signup/validate-username", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY }))["data"];
		// } catch (error) {
		// 	if (error.response) {
		// 		data = error.response.data;
		// 	} else if (error.request) {
		// 		data = { status: "error", content: error.request };
		// 	} else {
		// 		data = { status: "error", content: error.message };
		// 	}
		// }
		// console.log(data);

		// EXAMPLE: Retrieving user's username
		// const input = { properties: ["username"] };
		// let data;
		// try {
		// 	data = (await axios.post("/api/license/read", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input }))["data"];
		// } catch (error) {
		// 	if (error.response) {
		// 		data = error.response.data;
		// 	} else if (error.request) {
		// 		data = { status: "error", content: error.request };
		// 	} else {
		// 		data = { status: "error", content: error.message };
		// 	}
		// }
		// console.log(data);

		// EXAMPLE: Changing user's username
		// const input = { username: "carlvelasco", date: new Date().toString() };
		// let data;
		// try {
		// 	data = (await axios.post("/api/license/update", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input }))["data"];
		// } catch (error) {
		// 	if (error.response) {
		// 		data = error.response.data;
		// 	} else if (error.request) {
		// 		data = { status: "error", content: error.request };
		// 	} else {
		// 		data = { status: "error", content: error.message };
		// 	}
		// }
		// console.log(data);

		return () => setLoaded(false);
	}, []);

	useEffect(async () => {
		initSession(session, setUser);
	}, [session]);

	const helperClickHandler = () => {
		setShowHelper((state) => !state);
	};

	if (loading) return null;

	return (
		<div className={classes.index}>
			<Head>
				<title>Welcome | CreateBase</title>
				<meta name="description" content="Unleash your inner creator. CreateBase." />
			</Head>
			<div className={classes.bg}>
				<div style={{ height: "100%", width: "100%", position: "relative" }}>
					<Image src="/landing.png" layout="fill" objectFit="contain" quality={100} objectPosition={"75% 100%"} alt="Landing image" />
				</div>
			</div>
			<nav className={classes.nav}>
				<div className={classes.logo}>
					<WhiteLogo height={32} width={180} quality={100} />
				</div>
				<div className={classes.socials}>
					<FBIcon height={28} width={28} />
					<IGIcon height={28} width={28} />
					<TwitterIcon height={28} width={28} />
					<YTIcon height={28} width={28} />
				</div>
			</nav>
			<div className={classes.container}>
				<h2 className={classes.h2}>Welcome to the</h2>
				<h1 className={classes.h1}>
					Platform<div>Lite</div>
				</h1>
				{session ? (
					<div className={classes.btnContainer}>
						<SecondaryButton className={classes.signOut} mainLabel="Sign out" onClick={() => signOut({ callbackUrl: `${window.location.origin}` })} />
						<Link href="/onboarding">
							<button className={classes.loggedIn}>Continue as {user.displayName}</button>
						</Link>
					</div>
				) : (
					<div className={classes.btnContainer}>
						<Link href="/auth/signup">
							<button className={classes.signUp}>Sign Up</button>
						</Link>
						<Link href="/auth/login">
							<button className={classes.logIn}>
								Log In<i className="material-icons-outlined">login</i>
							</button>
						</Link>
						<Link href="/onboarding">
							<button className={classes.guest}>Continue as guest</button>
						</Link>
					</div>
				)}
			</div>
			<div className={classes.help}>
				<button className={showHelper ? classes.active : ""} onClick={helperClickHandler}>
					What's this?
					<i className="material-icons-outlined">close</i>
				</button>
				<p className={showHelper ? "" : classes.hide}>
					At CreateBase, we want to change the world by enabling the next generation of creators. That's why we're developing a project-centric educational platform to give people the skills, tools,
					and confidence to unleash their inner technology creator.
					<br />
					<br />
					You're about to experience a tiny portion of our final platform, something that we call a<span className={`${classes.italic} span`}>Project</span>. You'll be introduced to a situation and
					will need to apply skills and problem-solving to build a working solution. Your progress will be saved as you move through the Project, so feel free to take your time and, most importantly,
					have fun along the way.
					<br />
					<br />
					💜 Team CreateBase
				</p>
			</div>
		</div>
	);
};

export default Index;
