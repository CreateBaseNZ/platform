import SwiperCore, { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Modal from "../UI/Modal";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  TutorialModule,
  VideoModule,
  SneakPeekModule,
  HintModule,
} from "../Modules";
import CloseIcon from "@material-ui/icons/Close";
import { instructions } from "../../projects/send-it/research";

import classes from "./overview.module.scss";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
SwiperCore.use([Pagination]);

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
                    src={"/send-it/tutorial/video-" + (i + 1) + ".mp4"}
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
      <div className={classes.pagination}></div>
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

const Research = ({ query }) => {
  const [activeModal, setActiveModal] = useState();

  const closeModalHandler = () => {
    setActiveModal(null);
  };

  const openModal = (id) => {
    let modal;
    switch (id) {
      case "send-it__tutorial":
        modal = <SendIt closeHandler={closeModalHandler} />;
        break;
      case "send-it__situation":
        modal = <Situation closeHandler={closeModalHandler} />;
        break;
    }
    setActiveModal(<Modal children={modal} closeHandler={closeModalHandler} />);
  };

  return (
    <section id="research">
      <div className={classes.wrapper}>
        {activeModal}
        <h2>Research</h2>
        <div className={classes.moduleContainer}>
          {query === "send-it" && (
            <>
              <a
                href="/intro-to-flow.pdf"
                target="_blank"
                title="Introduction to Flow Blocks PDF"
              >
                <TutorialModule>
                  Introduction to <span>Flow</span> Blocks
                </TutorialModule>
              </a>
              <a
                href="/sensing-blocks.pdf"
                target="_blank"
                title="I Sense a Disturbance in the Blocks PDF"
              >
                <HintModule>
                  Tips &amp; Tricks: <span>Sensing</span> Blocks
                </HintModule>
              </a>
              <TutorialModule
                title="Watch the tutorial"
                onClick={openModal.bind(this, "send-it__tutorial")}
              >
                How to <span>Send It</span>
              </TutorialModule>
              <Link href={`/${query}/play`}>
                <div title="Play Send It">
                  <SneakPeekModule>
                    Give it a <span>Go</span>
                  </SneakPeekModule>
                </div>
              </Link>
              <VideoModule
                onClick={openModal.bind(this, "send-it__situation")}
                title="Play the situation video"
              >
                Rewatch the <span>Situation</span> Video
              </VideoModule>
            </>
          )}
          {query === "magnebot" && (
            <>
              <a
                href="/intro-to-flow.pdf"
                target="_blank"
                title="Introduction to Flow Blocks PDF"
              >
                <TutorialModule>
                  Introduction to <span>Flow</span> Blocks
                </TutorialModule>
              </a>
              <Link href={`/${query}/play`}>
                <div title="Play MagneBot">
                  <SneakPeekModule>
                    Give it a <span>Go</span>
                  </SneakPeekModule>
                </div>
              </Link>
            </>
          )}
        </div>
        <p className={classes.description}>
          {query === "send-it" &&
            "Work through the four modules above to complete your research. Make sure that you understand all of the content as you will need it to create your solution!"}
          {query === "magnebot" &&
            "Work through the modules above to complete your individual research. Make sure that you understand all of the content as you will need it to create your own solution! if you get stuck, see if any of your classmates can lend a helping hand."}
        </p>
      </div>
    </section>
  );
};

export default Research;
