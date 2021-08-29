import { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../components/Header";
import { useSession } from "next-auth/client";
import axios from "axios";

import classes from "/styles/Faq.module.scss";
import Img from "../components/UI/Img";
import faqData from "../data/faq-data";

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
    if (session) {
      let data;
      try {
        data = (
          await axios.post("/api/user/data/read", { input: ["displayName"] })
        )["data"];
      } catch (error) {
        data = { status: "error", content: error };
      }
      console.log(data);
      if (data.status === "error") {
        console.log("error"); // TODO handle error
      }
      setUser({
        type: session.user.access,
        org: session.user.organisation,
        name: data.content.displayName,
      });
    }
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
      setActiveHeight(
        document.querySelectorAll("." + classes.answer)[index].clientHeight
      );
      setActiveItemIndex(index);
    }
  };

  return (
    <div className={classes.faq}>
      <Head>
        <title>FAQ | CreateBase</title>
        <meta
          name="description"
          content="Frequently asked questions about the CreateBase platform"
        />
      </Head>
      <Header
        session={session}
        type={user.type}
        org={user.org}
        name={user.name}
      />
      <div className={classes.view}>
        <h1>Frequently Asked Questions</h1>
        <div className={classes.main}>
          <aside className={classes.aside}>
            <div className={classes.toc}>
              <div
                className={classes.slider}
                style={{ top: `calc(4rem * ${activeSectionIndex})` }}
              />
              {faqData.map((sect, i) => (
                <button
                  key={i}
                  className={activeSectionIndex === i ? classes.active : ""}
                  onClick={tocClickHandler.bind(this, i)}
                >
                  <i className="material-icons-outlined">{sect.icon}</i>
                  {sect.header}
                </button>
              ))}
            </div>
            <div className={classes.img}>
              <Img
                src="/faq.svg"
                height={200}
                width={200}
                layout="responsive"
              />
              <p>
                Still got questions?
                <a
                  href="https://createbase.co.nz/contact"
                  target="_blank"
                  title="https://createbase.co.nz/contact"
                >
                  Get in touch
                </a>
              </p>
            </div>
          </aside>
          <div className={classes.contentContainer}>
            <div className={`${classes.contentWrapper} roundScrollbar`}>
              {faqData[activeSectionIndex].items.map((item, i) => (
                <div
                  key={i}
                  className={`${classes.item} ${
                    activeItemIndex === i ? classes.active : ""
                  }`}
                >
                  <button onClick={itemClickHandler.bind(this, i)}>
                    {item.q}
                  </button>
                  <div
                    className={classes.collapseWrapper}
                    style={{
                      height: activeItemIndex === i ? activeHeight + "px" : 0,
                    }}
                  >
                    <p className={classes.answer}>{item.a}</p>
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

export default Faq;
