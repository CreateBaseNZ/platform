import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect } from "react";
import Image from "next/image";
import {
  LearnerLoginForm,
  LearnerSignupForm,
} from "../../components/Auth/LearnerForm";
import {
  EducatorLoginForm,
  EducatorSignupForm,
} from "../../components/Auth/EducatorForm";

import classes from "/styles/authView.module.scss";

const Auth = ({ setLoaded }) => {
  const router = useRouter();
  const [isSignup, setIsSignup] = useState(true);
  const [user, setUser] = useState("educator");

  useEffect(() => {
    if (window.localStorage.getItem("createbase__remember-me")) {
      setIsSignup(false);
    }
    setLoaded(true);
    return () => setLoaded(false);
  }, []);

  useEffect(() => {
    if (Object.keys(router.query).length) {
      const query = router.query.authView;
      if (query) {
        setIsSignup(query[0] === "signup");
      } else {
        setIsSignup(true);
      }
    }
  }, [router.query]);

  return (
    <div className={classes.authView}>
      <Head>
        <title>{isSignup ? "Sign Up" : "Log In"} | CreateBase</title>
        <meta name="description" content="Log into your CreateBase account" />
      </Head>
      <div className={classes.squiggle}>
        <Image
          src="/auth/squiggle-thin.svg"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className={classes.triangle} />
      <div className={classes.auth}>
        <div
          className={`${classes.imgContainer} ${
            user === "learner" ? classes.learnerImg : classes.educatorImg
          }`}
        >
          <div className={classes.imgWrapper}>
            <Image src="/auth/turtle.svg" layout="fill" objectFit="cover" />
          </div>
          <i className="material-icons-outlined">
            {isSignup ? (user === "learner" ? "backpack" : "school") : "login"}
          </i>
        </div>
        <div className={`${classes.formContainer} roundScrollbar`}>
          <div className={classes.tabs}>
            {["educator"].map((i) => (
              <button
                key={i}
                className={`${classes[i]} ${user === i ? classes.active : ""}`}
                onClick={() => setUser(i)}
              >
                {i}
              </button>
            ))}
          </div>
          {user === "learner" ? (
            isSignup ? (
              <LearnerSignupForm setIsSignup={setIsSignup} />
            ) : (
              <LearnerLoginForm setIsSignup={setIsSignup} />
            )
          ) : isSignup ? (
            <EducatorSignupForm setIsSignup={setIsSignup} />
          ) : (
            <EducatorLoginForm setIsSignup={setIsSignup} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
