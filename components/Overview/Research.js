import SwiperCore, { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Modal from "../UI/Modal";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  InfoModule,
  TutorialModule,
  VideoModule,
  SneakPeekModule,
} from "../Modules";
import CloseIcon from "@material-ui/icons/Close";

import classes from "/styles/Overview.module.scss";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
SwiperCore.use([Pagination, Navigation]);

const instructions = [
  "Run 1000m to deliver the Pizza",
  "Jump over obstacles to avoid crashing into them",
  "Crouch under flying obstacles to avoid crashing into them",
  "Change the simulation speed to allow more time for your code to react",
];

const SendIt = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    document.querySelectorAll(".sendItVideo").forEach((v) => {
      v.muted = true;
      v.setAttribute("muted", "1");
      console.log(v);
    });
  }, []);

  console.log(activeSlide);

  const slideChangeHandler = (swiper) => {
    console.log(swiper);
    setActiveSlide(swiper.activeIndex);
  };

  return (
    <div className={classes.sendIt}>
      <button className={classes.sendItClose}>
        <CloseIcon />
      </button>
      <Swiper
        className={classes.sendItContainer}
        onSlideChange={slideChangeHandler}
      >
        {instructions.map((text, i) => {
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
              <div className={classes.sendItCaption}>{text}</div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

const Research = (props) => {
  const [showSendIt, setShowSendIt] = useState(false);

  const sendItHandler = () => {
    setShowSendIt(true);
  };

  return (
    <section>
      <h2>Research</h2>
      <div className={classes.moduleContainer}>
        {showSendIt && (
          <Modal
            children={<SendIt />}
            closeHandler={() => setShowSendIt(false)}
          />
        )}
        <InfoModule>
          What is <span>Flow</span> Programming?
        </InfoModule>
        <TutorialModule>
          Introduction to Flow <span>Blocks</span>
        </TutorialModule>
        <TutorialModule onClick={sendItHandler}>
          How to <span>Send It</span>
        </TutorialModule>
        <VideoModule>
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
        Work through the modules above to complete your research.
      </p>
    </section>
  );
};

export default Research;
