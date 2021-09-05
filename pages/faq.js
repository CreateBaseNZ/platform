import { useState, useEffect } from "react";
import Head from "next/head";
import { useSession } from "next-auth/client";
import { initSession } from "../utils/authHelpers";

import classes from "/styles/Faq.module.scss";
import Img from "../components/UI/Img";
import faqData from "../data/faq-data";
import Frame from "../components/Frame";

const Faq = ({ setLoaded }) => {
	const [session, loading] = useSession();
	const [user, setUser] = useState({});
	const [activeSectionIndex, setActiveSectionIndex] = useState(0);
	const [activeItemIndex, setActiveItemIndex] = useState();
	const [activeHeight, setActiveHeight] = useState();

	useEffect(() => {
		setLoaded(true);
		return () => setLoaded(false);
	}, []);

	useEffect(async () => {
		initSession(session, setUser);
	}, [session]);

	if (loading) {
		return null;
	}

	const tocClickHandler = (index) => {
		setActiveSectionIndex(index);
		setActiveItemIndex(null);
	};

	const itemClickHandler = (index) => {
		if (index === activeItemIndex) {
			setActiveItemIndex(null);
		} else {
			setActiveHeight(document.querySelectorAll("." + classes.overflowContainer)[index].clientHeight);
			setActiveItemIndex(index);
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
								<div className={classes.slider} style={{ top: `calc(4rem * ${activeSectionIndex})` }} />
								{faqData.map((sect, i) => (
									<button key={i} className={activeSectionIndex === i ? classes.active : ""} onClick={tocClickHandler.bind(this, i)}>
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
								{faqData[activeSectionIndex].items.map((item, i) => (
									<div key={i} className={`${classes.item} ${activeItemIndex === i ? classes.active : ""}`}>
										<button onClick={itemClickHandler.bind(this, i)}>{item.q}</button>
										<div
											className={classes.collapseWrapper}
											style={{
												height: activeItemIndex === i ? activeHeight + "px" : 0,
											}}>
											<div className={classes.overflowContainer}>
												{/* {item.a.map((ans, i) =>
													ans[0] === "/" ? (
														<div key={i} className={classes.imgAnswer}>
															<Img src={ans} layout="fill" objectFit="contain" objectPosition="left" />
														</div>
													) : (
														<p key={i} className={classes.answer}>
															{ans}
														</p>
													)
												)} */}
												{item.a}
											</div>
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
