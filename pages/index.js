import { useEffect, useState } from "react";
import { useSession } from "next-auth/client";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { signIn } from "next-auth/client";
import { signOut } from "next-auth/client";
import axios from "axios";
import { SecondaryButton } from "../components/UI/Buttons";

import WhiteLogo, { FBIcon, IGIcon, TwitterIcon, YTIcon } from "/components/UI/Icons";

import classes from "/styles/Index.module.scss";

const Index = ({ setLoaded }) => {
	const [session, loading] = useSession();
	// const [name, setName] = useState("");
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
		// 	data = (await axios.post("/api/organisation/read-admin", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY }))["data"];
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
		// 	data = (await axios.post("/api/organisation/license/create-learner", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input }))["data"];
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
				<Image src="/landing.png" layout="fill" objectFit="contain" quality={100} objectPosition={"75% 100%"} alt="Landing image" />
			</div>
			<nav className={classes.nav}>
				<div className={classes.logo}>
					<WhiteLogo layout="fill" objectFit="contain" quality={100} />
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
						<Link href="/browse">
							{/* //TODO <button className={classes.loggedIn}>Continue as {name}</button> */}
							<button className={classes.loggedIn}>Continue</button>
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
						<Link href="/browse">
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
