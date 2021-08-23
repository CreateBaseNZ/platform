import { useState, useRef } from "react";
import { signIn } from "next-auth/client";
import { useRouter } from "next/dist/client/router";

import classes from "./AuthForm.module.scss";

import axios from "axios";

async function createUser(organisation, username, password) {
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
}

function AuthForm() {
  const organisationInputRef = useRef();
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredOrganisation = organisationInputRef.current.value;
    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (isLogin) {
      // TO DO: Validate login data
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
        // TO DO: Error handler
      }
    } else {
      // TO DO: Validate signup data
      // Send Signup Request
      let data;
      data = await createUser(
        enteredOrganisation,
        enteredUsername,
        enteredPassword
      );
      // Perform validation
      if (data.status === "failed") {
        // TO DO: Failed handler
      } else if (data.status === "error") {
        // TO DO: Error handler
      }
      // TO DO: Success handler
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
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
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
