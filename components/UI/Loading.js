import { useEffect, useState } from "react";
import classes from "./Loading.module.scss";

const messages = [
  "Booting up toaster",
  "Lorem ipsum dolor sit amet",
  "Red is greener than orange, for sure",
  "Greetings from the real universe",
  "Lime jelly is the best flavour",
  "Imagine a box",
  "Built different",
  "`format var ${foo}`",
  "JARVIS, you up?",
  "Never gona give you up",
];

const LoadingScreen = () => {
  const [i, setI] = useState(Math.floor(Math.random() * messages.length));

  useEffect(() => {
    const int = setInterval(() => {
      setI(Math.floor(Math.random() * messages.length));
    }, [1500]);

    return () => clearInterval(int);
  }, []);

  return (
    <div className={classes.loadingScreen}>
      <div className={classes.svgContainer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 900 900"
          fill="none"
        >
          <defs xmlns="http://www.w3.org/2000/svg">
            <linearGradient
              id="paint0_linear"
              x1="102.397"
              y1="452.423"
              x2="797.372"
              y2="447.319"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4E4ED6" />
              <stop offset="0.65" stopColor="#8258DC" />
              <stop offset="1" stopColor="#AD3BFF" />
            </linearGradient>
          </defs>
          <path
            d="M756.41 226.905L490 73.093C465.248 58.8023 434.752 58.8023 410 73.093L143.59 226.905C118.838 241.196 103.59 267.606 103.59 296.187V386V514V603.811C103.59 632.392 118.838 658.802 143.59 673.093L410 826.905C434.752 841.196 465.248 841.196 490 826.905L756.41 673.093C781.162 658.802 796.41 632.392 796.41 603.811V296.187C796.41 267.606 781.162 241.196 756.41 226.905Z"
            fill="url(#paint0_linear)"
          />
        </svg>
      </div>
      <div className={`${classes.svgContainer}`}>
        <div className={`${classes.svgWrapper} ${classes.mask}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 900 900"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.5 396V504H113.59H201.843C207.366 504 211.843 508.477 211.843 514V555.745C211.843 575.395 222.326 593.552 239.343 603.376L422.5 709.122C439.517 718.947 460.483 718.947 477.5 709.122L658.157 604.82C671.49 597.122 671.49 577.877 658.157 570.179L589.904 530.773C583.716 527.2 576.092 527.2 569.904 530.773L465 591.339C455.718 596.698 444.282 596.698 435 591.339L335.096 533.66C325.814 528.301 320.096 518.397 320.096 507.679V392.32C320.096 381.602 325.814 371.698 335.096 366.339L435 308.66C444.282 303.301 455.718 303.301 465 308.66L569.904 369.226C576.092 372.798 583.716 372.798 589.904 369.226L658.157 329.82C671.49 322.122 671.49 302.877 658.157 295.179L477.5 190.876C460.483 181.052 439.517 181.052 422.5 190.876L239.343 296.622C222.326 306.447 211.843 324.604 211.843 344.254V386C211.843 391.523 207.366 396 201.843 396H113.59H20.5Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
      <div className={`${classes.svgContainer}`}>
        <div className={`${classes.svgWrapper} ${classes.mask}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 900 900"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M488.302 422.113L455 402.887C451.906 401.1 448.094 401.1 445 402.887L411.699 422.113C408.605 423.899 406.699 427.201 406.699 430.773V469.226C406.699 472.799 408.605 476.1 411.699 477.887L445 497.113C448.094 498.899 451.906 498.899 455 497.113L488.302 477.887C491.396 476.1 493.302 472.799 493.302 469.226V430.773C493.302 427.201 491.396 423.899 488.302 422.113Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
      <p className={classes.caption}>{messages[i]}</p>
    </div>
  );
};

export default LoadingScreen;
