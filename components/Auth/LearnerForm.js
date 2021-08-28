import { useState } from "react";
import { useForm } from "react-hook-form";
import { PrimaryButton, SecondaryButton } from "../UI/Buttons";
import Input from "../UI/Input";

import classes from "./AuthForm.module.scss";
import {
  displayNameMinLength,
  displayNamePattern,
  usernameMinLength,
  usernamePattern,
} from "../../utils/formValidation";

export const LearnerSignupForm = ({ setIsSignup }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = async (input) => {
    setIsLoading(true);
    console.log(input);
    let frontEndError = false;
    if (isBlacklisted(input.username)) {
      setError("displayName", {
        type: "manual",
        message: "Display name contains disallowed words",
      });
      frontEndError = true;
    }
    if (isBlacklisted(input.displayName)) {
      setError("username", {
        type: "manual",
        message: "Username contains disallowed words",
      });
      frontEndError = true;
    }
    // TODO validate password
    if (frontEndError) {
      return setIsLoading(false);
    }

    let data;
    try {
      data = (
        await axios.post("/api/auth/signup", {
          code: input.orgCode,
          username: input.username,
          displayName: input.displayName,
          password: input.password,
          date: new Date().toString(),
        })
      )["data"];
    } catch (error) {
      data = { status: "error", content: error };
    }
    // Perform validation
    if (data.status === "failed") {
      // TODO: Failed handler
      return setIsLoading(false);
    } else if (data.status === "error") {
      // TODO: Error handler
      return setIsLoading(false);
    }

    // TODO: Success handler
    setIsLoading(false);
  };

  return (
    <form
      className={`${classes.form} ${classes.learnerForm}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1>Register a Learner account</h1>
      <Input
        inputProps={{
          className: classes.input,
          placeholder: "Organisation code",
          type: "text",
          ...register("orgCode"),
        }}
        error={errors.orgCode}
      />
      <Input
        inputProps={{
          className: classes.input,
          placeholder: "Username*",
          type: "text",
          maxLength: 254,
          ...register("username", {
            required: "Please enter a username",
            minLength: usernameMinLength,
            pattern: usernamePattern,
          }),
        }}
        error={errors.username}
      />
      <Input
        inputProps={{
          className: classes.input,
          placeholder: "Display name*",
          type: "text",
          maxLength: 254,
          ...register("displayName", {
            required: "A display name is required",
            minLength: displayNameMinLength,
            pattern: displayNamePattern,
          }),
        }}
        error={errors.displayName}
      />
      <Input
        inputProps={{
          className: classes.input,
          placeholder: "Password*",
          type: "password",
          ...register("password", {
            required: "Please enter a password",
          }),
        }}
        error={errors.password}
      />
      <PrimaryButton
        className={classes.submit}
        isLoading={isLoading}
        type="submit"
        loadingLabel="Signing you up ..."
        mainLabel="Sign Up"
      />
      <div className={classes.options}>
        <div
          className={`${classes.terms} ${
            errors.terms ? classes.termsError : ""
          }`}
        >
          <input type="checkbox" {...register("terms", { required: true })} />
          <div className={classes.checkbox}>
            <i className="material-icons-outlined">check</i>
          </div>
          <label>
            Agree to{" "}
            <a href="https://createbase.co.nz/terms" target="_blank">
              Terms &amp; Conditions
            </a>
          </label>
        </div>
      </div>
      <div className={classes.switch}>
        Have an account?
        <button type="button" onClick={() => setIsSignup(false)}>
          Log in
        </button>
      </div>
    </form>
  );
};

export const LearnerLoginForm = ({ setIsSignup }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = async (input) => {
    setIsLoading(true);
    console.log(input);
    let frontEndError = false;
    // any front end validations
    if (frontEndError) {
      return setIsLoading(false);
    }
    // TODO: login

    // TODO: Success handler
    setIsLoading(false);
  };

  return (
    <form
      className={`${classes.form} ${classes.learnerForm} ${classes.loginForm}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1>Log in to your Learner account</h1>
      <Input
        inputProps={{
          className: classes.input,
          placeholder: "Username*",
          type: "text",
          maxLength: 254,
          ...register("username", {
            required: "Please enter your username",
          }),
        }}
        error={errors.username}
      />
      <Input
        inputProps={{
          className: classes.input,
          placeholder: "Password*",
          type: "password",
          ...register("password", {
            required: "Please enter your password",
          }),
        }}
        error={errors.password}
      />
      <PrimaryButton
        className={classes.submit}
        isLoading={isLoading}
        type="submit"
        loadingLabel="Logging you in ..."
        mainLabel="Log In"
      />
      <SecondaryButton
        className={classes.signupBtn}
        isDisabled={isLoading}
        type="button"
        mainLabel="Create an Account"
        onClick={() => setIsSignup(true)}
      />
      <div className={classes.options}>
        <div className={classes.remember}>
          <input
            type="checkbox"
            {...register("remember", { required: true })}
          />
          <div className={classes.checkbox}>
            <i className="material-icons-outlined">check</i>
          </div>
          <label>Remember me</label>
        </div>
        <button
          type="button"
          className={classes.forgot}
          onClick={() => console.log("//TODO")}
        >
          Forgot your password?
        </button>
      </div>
    </form>
  );
};
