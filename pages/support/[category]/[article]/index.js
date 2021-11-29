import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MainLayout from "../../../../components/Layouts/MainLayout/MainLayout";
import SUPPORT_DATA from "../../../../data/support-data";
import Head from "next/head";

import classes from "../../../../styles/supportArticle.module.scss";

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
				query: `${key}-${article.query}`,
			}))
		)
	)
	.flat(2);

const SupportArticle = () => {
	const router = useRouter();
	const [data, setData] = useState();

	useEffect(() => {
		if (router.isReady) {
			const _data = FUSE_DATA.find((article) => article.query === `${router.query.category}-${router.query.article}`);
			if (_data) {
				setData(_data);
			} else {
				router.replace("/404");
			}
		}
	}, [router.query.article]);

	if (!data) return null;

	return (
		<div className={`${classes.article} roundScrollbar`}>
			<Head>
				<title>{data.heading} • Support Center | CreateBase</title>
				<meta name="description" content="CreateBase Support Center." />
			</Head>
			<div className={classes.content}>
				<div className={classes.breadCrumbs}>
					<Link href="/support">
						<button title="Support Center">Support Center</button>
					</Link>
					<i className="material-icons-outlined">chevron_right</i>
					<Link href={data.path[0].pathname}>
						<button title={data.path[0].label}>{data.path[0].label}</button>
					</Link>
					<i className="material-icons-outlined">chevron_right</i>
					<button title={data.heading}>{data.heading}</button>
				</div>
				<h1>{data.heading}</h1>
				<div className={classes.caption}>{data.caption}</div>
				<div className={classes.main}>{data.content}</div>
			</div>
		</div>
	);
};

SupportArticle.getLayout = (page) => {
	return <MainLayout page="support">{page}</MainLayout>;
};

SupportArticle.auth = "any";

export default SupportArticle;
