import SwiperCore, { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Modal from "../UI/Modal";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TutorialModule, VideoModule, SneakPeekModule } from "../Modules";
import CloseIcon from "@material-ui/icons/Close";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

import classes from "/styles/Overview.module.scss";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
SwiperCore.use([Pagination]);

const instructions = [
  ["Run 1000m to deliver the Pizza"],
  ["Jump over obstacles to avoid crashing into them", <ArrowUpwardIcon />],
  [
    "Crouch under flying obstacles to avoid crashing into them",
    <ArrowDownwardIcon />,
  ],
  ["Change the simulation speed to allow more time for your code to react"],
];

const renderBullet = (index, className) => {
  return `<span class="${className}"></span>`;
};

const swiperOptions = {
  observer: true,
  observeParents: true,
  pagination: {
    type: "bullets",
    el: `.${classes.pagination}`,
    bulletClass: classes.bullet,
    bulletActiveClass: classes.bulletActive,
    renderBullet: renderBullet,
    clickable: true,
  },
};

const SendIt = (props) => {
  useEffect(() => {
    document.querySelectorAll(".sendItVideo").forEach((v) => {
      v.muted = true;
      v.setAttribute("muted", "1");
    });
  }, []);

  return (
    <div className={classes.sendIt}>
      <button className={classes.sendItClose} onClick={props.closeHandler}>
        <CloseIcon />
      </button>
      <Swiper {...swiperOptions} className={classes.sendItContainer}>
        {instructions.map((caption, i) => {
          return (
            <SwiperSlide key={i} className={classes.sendItSlide}>
              <div className={classes.slideVideoWrapper}>
                <video
                  autoPlay={true}
                  loop={true}
                  muted={true}
                  allow="autoplay"
                  className="sendItVideo"
                >
                  <source
                    src={"/send-it-tutorial/video-" + (i + 1) + ".mp4"}
                    type="video/mp4"
                  />
                </video>
              </div>
              <div className={classes.sendItCaption}>
                {caption.map((x, i) => (
                  <span key={i}>{x}</span>
                ))}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div
        className={classes.pagination}
        style={{ visibility: props.mode === "verifying" && "hidden" }}
      ></div>
    </div>
  );
};

const Situation = (props) => {
  return (
    <div className={classes.situation}>
      <button className={classes.situationClose} onClick={props.closeHandler}>
        <CloseIcon />
      </button>
      <video controls>
        <source src="/situation.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

const Research = (props) => {
  const [showSendIt, setShowSendIt] = useState(false);
  const [showSituation, setShowSituation] = useState(false);

  const sendItShowHandler = () => {
    setShowSendIt(true);
  };
  const sendItCloseHandler = () => {
    setShowSendIt(false);
  };
  const situationShowHandler = () => {
    setShowSituation(true);
  };
  const situationCloseHandler = () => {
    setShowSituation(false);
  };

  return (
    <section id="research">
      {showSendIt && (
        <Modal
          children={<SendIt closeHandler={sendItCloseHandler} />}
          closeHandler={sendItCloseHandler}
        />
      )}
      {showSituation && (
        <Modal
          children={<Situation closeHandler={situationCloseHandler} />}
          closeHandler={situationCloseHandler}
        />
      )}
      <h2>Research</h2>
      <div className={classes.moduleContainer}>
        <a
          href="/intro-to-flow.pdf"
          target="_blank"
          title="Introduction to Flow Blocks PDF"
        >
          <TutorialModule>
            Introduction to <span>Flow</span> Blocks
          </TutorialModule>
        </a>
        <TutorialModule onClick={sendItShowHandler} title="Watch the tutorial">
          How to <span>Send It</span>
        </TutorialModule>
        <VideoModule
          onClick={situationShowHandler}
          title="Play the situation video"
        >
          Rewatch the <span>Situation</span> Video
        </VideoModule>
        <Link
          href={{
            pathname: "/play/[project]",
            query: { project: props.project.query },
          }}
        >
          <div title="Play Send It">
            <SneakPeekModule>
              Give it a <span>Go</span>
            </SneakPeekModule>
          </div>
        </Link>
      </div>
      <p className={classes.description}>
        Work through the four modules above to complete your research. Make sure
        that you understand all of the content as you will need it to create
        your solution!
      </p>
    </section>
  );
};

export default Research;
