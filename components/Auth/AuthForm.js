import { useState, useRef } from "react";
import { signIn } from "next-auth/client";
import { useRouter } from "next/dist/client/router";

import classes from "./AuthForm.module.scss";

import axios from "axios";

const createUser = async (organisation, username, password) => {
  // Build signup input data
  const input = {
    name: organisation,
    username,
    password,
    date: new Date().toString(),
  };
  // Send signup request
  let data;
  try {
    data = (await axios.post("/api/auth/signup", input))["data"];
  } catch (error) {
    data = { status: "error", content: error };
  }
  // Return the resulting data
  return data;
};

const AuthForm = ({ isLogin }) => {
  const router = useRouter();
  const organisationInputRef = useRef();
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  console.log(isLogin);

  const switchAuthModeHandler = () => {
    console.log("clicked");
    isLogin ? router.push("/auth/signup") : router.push("/auth/login");
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredOrganisation = organisationInputRef.current.value;
    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (isLogin) {
      // TODO: Validate login data
      // Login the user
      const result = await signIn("credentials", {
        redirect: false,
        name: enteredOrganisation,
        username: enteredUsername,
        password: enteredPassword,
      });
      // Redirect if successful
      if (!result.error) {
        console.log("success");
        router.replace("/browse");
      } else {
        // TODO: Error handler
      }
    } else {
      // TODO: Validate signup data
      // Send Signup Request
      let data;
      data = await createUser(
        enteredOrganisation,
        enteredUsername,
        enteredPassword
      );
      // Perform validation
      if (data.status === "failed") {
        // TODO: Failed handler
      } else if (data.status === "error") {
        // TODO: Error handler
      }
      // TODO: Success handler
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Log In" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="organisation">Your Organisation</label>
          <input
            type="text"
            id="organisation"
            required
            ref={organisationInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="username">Your Username</label>
          <input type="text" id="username" required ref={usernameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Log In" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Log in with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
