import Head from "next/head";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Fuse from "fuse.js";
import GlobalSessionContext from "../../store/global-session-context";
import MainLayout from "../../components/Layouts/MainLayout/MainLayout";
import { PrimaryButton, SecondaryButton } from "../../components/UI/Buttons";
import { SearchBar } from "../../components/UI/Input";
import UserCard from "../../components/Support/UserCard";

import SUPPORT_DATA from "../../data/support-data";
import classes from "../../styles/support.module.scss";
import { useRouter } from "next/router";

const FUSE_DATA = Object.keys(SUPPORT_DATA)
	.map((key) =>
		SUPPORT_DATA[key].sections.map((section) =>
			section.articles.map((article) => ({
				path: [
					{ label: `${key[0].toUpperCase()}${key.slice(1)} Support`, pathname: `/support/${key}` },
					{ label: section.heading, pathname: `/support/${key}#${section.query}` },
					{ label: article.heading, pathname: `/support/${key}/${article.query}` },
				],
				...article,
			}))
		)
	)
	.flat(2);

console.log(FUSE_DATA);

const Support = () => {
	const router = useRouter();
	const inputRef = useRef();
	const { globalSession } = useContext(GlobalSessionContext);
	const [fuse] = useState(
		new Fuse(FUSE_DATA, {
			keys: ["query", "heading", "tags"],
		})
	);
	const [results, setResults] = useState();

	useEffect(() => {
		if (router.isReady) {
			if (router.query.search) {
				const res = fuse.search(router.query.search);
				console.log(res);
				setResults(res);
			} else {
				setResults(null);
			}
		}
	}, [router.query.search]);

	const submitHandler = (e) => {
		e.preventDefault();
		router.push({ pathname: "/support", query: { search: inputRef.current.value } });
	};

	const clearHandler = () => {
		router.push("/support");
		inputRef.current.value = "";
	};

	return (
		<div className={`${classes.support} roundScrollbar`}>
			<Head>
				<title>{results ? "Search results" : "Support Center"} | CreateBase</title>
				<meta name="description" content="CreateBase Support Center." />
			</Head>
			<div className={`${classes.banner} ${results ? classes.shrink : ""}`}>
				<div className={`${classes.shape} ${classes.red}`} />
				<div className={`${classes.shape} ${classes.green}`} />
				<div className={`${classes.shape} ${classes.blue}`} />
				<div className={`${classes.shape} ${classes.yellow}`} />
				<div className={classes.bannerContent}>
					<h2 onClick={clearHandler} title="Support Center">
						Support Center
					</h2>
					<h1>How can we help{globalSession.accountId ? `, ${globalSession.firstName}` : "you"}?</h1>
					<form onSubmit={submitHandler}>
						<SearchBar className={classes.searchbar} inputProps={{ ref: inputRef }} />
					</form>
				</div>
				{!globalSession.accountId && (
					<div className={classes.auth}>
						<PrimaryButton mainLabel="Sign up" className={classes.signup} onClick={signIn} />
						<SecondaryButton mainLabel="Log in" className={classes.login} onClick={signIn} />
					</div>
				)}
			</div>
			{results ? (
				<div className={classes.resultsContainer}>
					<h2>
						{results.length} results for "{router.query.search}"
						<button title="Clear results" onClick={clearHandler}>
							<i className="material-icons-outlined">clear</i>Clear
						</button>
					</h2>
					{results.map((res) => (
						<div key={res.refIndex} className={classes.result}>
							<Link href={res.item.path.slice(-1)[0].pathname}>
								<h3>{res.item.heading}</h3>
							</Link>
							<div className={classes.breadCrumbs}>
								{res.item.path.map((crumb, i) => (
									<Fragment key={crumb.label}>
										<Link href={crumb.pathname}>
											<button className={classes.crumb} title={crumb.label}>
												{crumb.label}
											</button>
										</Link>
										{i < res.item.path.length - 1 && <i className="material-icons-outlined">chevron_right</i>}
									</Fragment>
								))}
							</div>
						</div>
					))}
				</div>
			) : (
				<div className={classes.cardContainer}>
					<UserCard title="Students" imgSrc="https://raw.githubusercontent.com/CreateBaseNZ/public/main/support/students.svg" route="/support/students" />
					<UserCard title="Teachers" imgSrc="https://raw.githubusercontent.com/CreateBaseNZ/public/main/support/teachers.svg" route="/support/teachers" />
					<UserCard title="Admins" imgSrc="https://raw.githubusercontent.com/CreateBaseNZ/public/main/support/admins.svg" route="/support/admins" />
				</div>
			)}
		</div>
	);
};

Support.getLayout = (page) => {
	return <MainLayout page="support">{page}</MainLayout>;
};

Support.auth = "any";

export default Support;
