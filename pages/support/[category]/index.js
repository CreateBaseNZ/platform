import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import MainLayout from "../../../components/Layouts/MainLayout/MainLayout";
import SUPPORT_DATA from "../../../data/support-data";

import classes from "../../../styles/supportCategory.module.scss";

const SupportCategory = () => {
	const router = useRouter();
	const [data, setData] = useState();

	useEffect(() => {
		if (router.isReady) {
			if (SUPPORT_DATA[router.query.category]) {
				setData(SUPPORT_DATA[router.query.category]);
			} else {
				router.replace("/support");
			}
		}
	}, [router.isReady, router.query.category]);

	useEffect(() => {
		const hash = window.location.hash;
		if (data && hash) {
			document.querySelector(hash).scrollIntoView({
				block: "start",
			});
		}
	}, [data]);

	if (!data) return null;

	return (
		<div className={`${classes.category} roundScrollbar`}>
			<Head>
				<title>{data.heading} | CreateBase</title>
				<meta name="description" content="CreateBase Support Center." />
			</Head>
			<div className={classes.content}>
				<div className={classes.breadCrumbs}>
					<Link href="/support">
						<button title="Support Center">Support Center</button>
					</Link>
					<i className="material-icons-outlined">chevron_right</i>
					<button title={data.heading}>{data.heading}</button>
				</div>
				<h1>
					<i className="material-icons-outlined">{data.icon}</i>
					{data.heading}
				</h1>
				<div className={classes.subheading}>{data.subheading}</div>
				{data.sections.map((section) => (
					<section key={section.query} className={classes.section} id={section.query}>
						<h2>{section.heading}</h2>
						<div className={classes.linkContainer}>
							{section.articles.map((article) => (
								<Link key={article.query} href={{ pathname: "/support/[category]/[article]", query: { category: router.query.category, article: article.query } }}>
									<div className={classes.link} title={article.heading}>
										{article.heading}
									</div>
								</Link>
							))}
						</div>
					</section>
				))}
			</div>
		</div>
	);
};

SupportCategory.getLayout = (page) => {
	return <MainLayout page="support">{page}</MainLayout>;
};

SupportCategory.auth = "any";

export default SupportCategory;
