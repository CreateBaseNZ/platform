import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Img from "./UI/Img";
import supportData from "../data/support-data";
import Head from "next/head";

import classes from "./Support.module.scss";

const sectionLength = supportData.length;

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

const Support = ({ user }) => {
	const router = useRouter();
	const [activeIndex, setActiveIndex] = useState({ section: 0, item: null });
	const [activeHeight, setActiveHeight] = useState();

	useEffect(() => {
		const query = router.query.view[1];
		if (query) {
			const section = parseInt(query.split("-")[0]);
			const item = parseInt(query.split("-")[1]);
			if (section >= 0 && section <= sectionLength) {
				if (item >= 0 && item <= supportData[section].items.length) {
					setActiveIndex({ section: section, item: item });
				} else {
					setActiveIndex({ section: section, item: null });
				}
			}
		}
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

	const tocClickHandler = (index) => {
		setActiveIndex({ section: index, item: null });
	};

	const itemClickHandler = (index) => {
		if (index === activeIndex.item) {
			setActiveIndex((state) => ({ ...state, item: null }));
		} else {
			setActiveIndex((state) => ({ ...state, item: index }));
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
							{supportData.map((sect, i) => (
								<button key={i} className={activeIndex.section === i ? classes.active : ""} onClick={tocClickHandler.bind(this, i)}>
									<i className="material-icons-outlined">{sect.icon}</i>
									{sect.header}
								</button>
							))}
						</div>
						<div className={classes.img}>
							<Img src="/support/get-in-touch.svg" height={200} width={200} layout="responsive" />
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
							{supportData[activeIndex.section].items.map((item, i) => (
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

export default Support;