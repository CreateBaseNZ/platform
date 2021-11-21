import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Img from "../components/UI/Img";
import SUPPORT_DATA from "../data/support-data";
import MainLayout from "../components/Layouts/MainLayout/MainLayout";

import classes from "../styles/support.module.scss";

const awaitImages = async (images, callback) => {
	let count = 0;
	const addLoaded = () => {
		count++;
		if (count === images.length) {
			callback();
		}
	};
	images.forEach((img) => {
		if (!img.clientHeight) {
			img.addEventListener("load", addLoaded, false);
		} else {
			count++;
		}
	});
	if (count === images.length) {
		callback();
	}
};

const Support = () => {
	const router = useRouter();
	const [activeIndex, setActiveIndex] = useState({ section: 0, item: null });
	const [activeHeight, setActiveHeight] = useState();

	useEffect(() => {
		const sectionIndex = SUPPORT_DATA[parseInt(router?.query?.section)] ? parseInt(router?.query?.section) : 0;
		const itemIndex = SUPPORT_DATA[sectionIndex].items[parseInt(router?.query?.item)] ? parseInt(router?.query?.item) : null;
		setActiveIndex({ section: sectionIndex, item: itemIndex });
	}, [router.query]);

	useEffect(() => {
		if (activeIndex.item !== null && activeIndex.item !== undefined) {
			const el = document.querySelectorAll("." + classes.overflowContainer)[activeIndex.item];
			const images = el.querySelectorAll("img");
			if (images.length) {
				awaitImages(images, () => {
					setActiveHeight(el.clientHeight);
				});
			} else {
				if (el) setActiveHeight(el.clientHeight);
			}
		}
	}, [activeIndex.item]);

	const itemClickHandler = (index) => {
		if (index === activeIndex.item) {
			router.replace({ query: { section: activeIndex.section } });
		} else {
			router.replace({ query: { section: activeIndex.section, item: index } });
		}
	};

	return (
		<div className={classes.support}>
			<Head>
				<title>Support | CreateBase</title>
				<meta name="description" content="Educator support and frequently asked questions about the CreateBase platform" />
			</Head>
			<div className={classes.view}>
				<h1>Support</h1>
				<div className={classes.main}>
					<aside className={classes.aside}>
						<div className={classes.toc}>
							<div className={classes.slider} style={{ top: `calc(7vh * ${activeIndex.section})` }} />
							{SUPPORT_DATA.map((sect, i) => (
								<Link key={i} href={{ query: { section: i } }}>
									<button key={i} className={activeIndex.section === i ? classes.active : ""}>
										<i className="material-icons-outlined">{sect.icon}</i>
										{sect.header}
									</button>
								</Link>
							))}
						</div>
						<div className={classes.img}>
							<Img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/support/get-in-touch.svg" height={200} width={200} layout="responsive" />
							<p>
								Still got questions?
								<a href="https://createbase.co.nz/contact" target="_blank" title="https://createbase.co.nz/contact">
									Get in touch
								</a>
							</p>
						</div>
					</aside>
					<div className={classes.contentContainer}>
						<div className={`${classes.contentWrapper} roundScrollbar`}>
							{SUPPORT_DATA[activeIndex.section].items.map((item, i) => (
								<div key={i} className={`${classes.item} ${activeIndex.item === i ? classes.active : ""}`}>
									<button onClick={itemClickHandler.bind(this, i)}>{item.q}</button>
									<div
										className={classes.collapseWrapper}
										style={{
											height: activeIndex.item === i ? activeHeight + "px" : 0,
										}}>
										<div className={classes.overflowContainer}>{item.a}</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

Support.getLayout = (page) => {
	return <MainLayout page="support">{page}</MainLayout>;
};

Support.auth = "user";

export default Support;
