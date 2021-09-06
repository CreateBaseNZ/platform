import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { initSession } from "../../utils/authHelpers";

import classes from "/styles/Faq.module.scss";
import Img from "../../components/UI/Img";
import faqData from "../../data/faq-data";
import Frame from "../../components/Frame";

const sectionLength = faqData.length;

const awaitImages = (images, callback) => {
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
};

const Faq = ({ setLoaded }) => {
	const router = useRouter();
	const [session, loading] = useSession();
	const [user, setUser] = useState({});
	const [activeIndex, setActiveIndex] = useState({ section: 0, item: null });
	const [activeHeight, setActiveHeight] = useState();
	const [imagesLoaded, setImagesLoaded] = useState(false);

	useEffect(() => {
		setLoaded(true);
		return () => setLoaded(false);
	}, []);

	useEffect(async () => {
		initSession(session, setUser);
	}, [session]);

	useEffect(() => {
		const query = router.query;
		if (Object.keys(query).length) {
			const section = parseInt(query.faq[0].split("-")[0]);
			const item = parseInt(query.faq[0].split("-")[1]);
			if (section >= 0 && section <= sectionLength) {
				if (item >= 0 && item <= faqData[section].items.length) {
					setActiveIndex({ section: section, item: item });
				} else {
					setActiveIndex({ section: section, item: null });
				}
			}
		}
	}, [router.query]);

	useEffect(() => {
		if (!loading && activeIndex.item !== null && activeIndex.item !== undefined) {
			const el = document.querySelectorAll("." + classes.overflowContainer)[activeIndex.item];
			const images = el.querySelectorAll("img");
			if (!imagesLoaded && images.length && !images[0].clientHeight) {
				awaitImages(images, () => {
					setActiveHeight(el.clientHeight);
					setImagesLoaded(true);
				});
			} else {
				setImagesLoaded(true);
				if (el) setActiveHeight(el.clientHeight);
			}
		}
	}, [activeIndex.item, loading]);

	if (loading) {
		return null;
	}

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
		<Frame tabIndex={4} session={session} type={user.type} org={user.org} username={user.username} displayName={user.displayName}>
			<div className={classes.faq}>
				<Head>
					<title>FAQ | CreateBase</title>
					<meta name="description" content="Frequently asked questions about the CreateBase platform" />
				</Head>
				<div className={classes.view}>
					<h1>Frequently Asked Questions</h1>
					<div className={classes.main}>
						<aside className={classes.aside}>
							<div className={classes.toc}>
								<div className={classes.slider} style={{ top: `calc(7vh * ${activeIndex.section})` }} />
								{faqData.map((sect, i) => (
									<button key={i} className={activeIndex.section === i ? classes.active : ""} onClick={tocClickHandler.bind(this, i)}>
										<i className="material-icons-outlined">{sect.icon}</i>
										{sect.header}
									</button>
								))}
							</div>
							<div className={classes.img}>
								<Img src="/faq/get-in-touch.svg" height={200} width={200} layout="responsive" />
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
								{faqData[activeIndex.section].items.map((item, i) => (
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
		</Frame>
	);
};

export default Faq;
