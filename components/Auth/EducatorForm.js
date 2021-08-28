import { useState } from "react";
import { useForm } from "react-hook-form";
import { PrimaryButton, SecondaryButton } from "../UI/Buttons";
import blacklist from "../../utils/blacklist";
import Input from "../UI/Input";

import classes from "./AuthForm.module.scss";

const EducatorSignupRegisterForm = ({
  setIsSignup,
  setIsRegister,
  setUserDetails,
}) => {
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
    if (blacklist.some((v) => input.username.includes(v))) {
      setError("displayName", {
        type: "manual",
        message: "Display name contains disallowed words",
      });
      frontEndError = true;
    }
    if (blacklist.some((v) => input.displayName.includes(v))) {
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

    // let data;
    // try {
    //   data = (
    //     await axios.post("/api/auth/signup", {
    //       code: input.code,
    //       username: input.username,
    //       displayName: input.displayName,
    //       password: input.password,
    //       date: new Date().toString(),
    //     })
    //   )["data"];
    // } catch (error) {
    //   data = { status: "error", content: error };
    // }
    // // Perform validation
    // if (data.status === "failed") {
    //   // TODO: Failed handler
    //   return setIsLoading(false);
    // } else if (data.status === "error") {
    //   // TODO: Error handler
    //   return setIsLoading(false);
    // }

    // TODO: Success handler
    setUserDetails({
      code: input.code,
      username: input.username,
      displayName: input.displayName,
      password: input.password,
      date: new Date().toString(),
    });
    setIsLoading(false);
    setIsRegister(false);
  };

  return (
    <form
      className={`${classes.form} ${classes.educatorForm}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1>Register an Educator account</h1>
      {/* <Input
        inputProps={{
          className: classes.input,
          placeholder: "Organisation code",
          type: "text",
          ...register("code"),
        }}
        error={errors.code}
      /> */}
      <Input
        inputProps={{
          className: classes.input,
          placeholder: "Email*",
          ...register("email", {
            required: "An email is required",
            pattern: {
              value:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Please enter a valid email address",
            },
          }),
        }}
        error={errors.email}
      />
      <Input
        inputProps={{
          className: classes.input,
          placeholder: "Username*",
          type: "text",
          ...register("username", {
            required: "A username is required",
            minLength: {
              value: 3,
              message: "Usernames must be at least 3 characters long",
            },
            pattern: {
              value: /^[a-zA-Z0-9]+$/,
              message: "Usernames can only contain alphanumeric characters",
            },
          }),
        }}
        error={errors.username}
      />
      <Input
        inputProps={{
          className: classes.input,
          placeholder: "Display name*",
          type: "text",
          ...register("displayName", {
            required: "A display name is required",
            minLength: {
              value: 3,
              message: "Display names must be at least 3 characters long",
            },
            pattern: {
              value: /^[a-zA-Z\- ]+$/,
              message: "Display names can only contain A—Z, a—z, and -",
            },
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

const EducatorSignupOrgForm = ({ setIsSignup, setIsRegister, userDetails }) => {
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
    // TODO check code

    if (input.orgCode || (input.schoolName && input.schoolId)) {
      alert("nice");
    } else {
      if (!input.orgCode) {
        setError("orgCode", {
          type: "manual",
          message: "Please enter an org code, or fill in the details below",
        });
      }
      if (!input.schoolId) {
        setError("schoolId", {
          type: "manual",
          message: "Please enter your school ID, or enter an org code",
        });
      }
      if (!input.schoolName) {
        setError("schoolName", {
          type: "manual",
          message: "Please enter your school name, or enter an org code",
        });
      }
      return setIsLoading(false);
    }

    let frontEndError = false;
    if (frontEndError) {
    }

    // TODO: Success handler
    setIsLoading(false);
    setIsRegister(false);
  };

  return (
    <form
      className={`${classes.form} ${classes.educatorForm}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1>Join an Org</h1>
      <div className={classes.instructions}>
        If your school has already signed up, enter your code below:
      </div>
      <Input
        inputProps={{
          className: classes.input,
          placeholder: "Organisation code",
          type: "text",
          ...register("orgCode"),
        }}
        error={errors.orgCode}
      />
      <div className={classes.instructions} style={{ marginTop: "1vh" }}>
        To sign up your org for the first time, enter its details below:
      </div>
      <Input
        inputProps={{
          className: classes.input,
          type: "text",
          placeholder: "School ID",
          ...register("schoolId"),
        }}
        error={errors.schoolId}
      />
      <Input
        inputProps={{
          className: classes.input,
          type: "text",
          placeholder: "School Name",
          ...register("schoolName"),
        }}
        error={errors.schoolName}
      />
      <PrimaryButton
        className={classes.submit}
        isLoading={isLoading}
        type="submit"
        loadingLabel="Joining org ..."
        mainLabel="Join"
      />
      <button
        type="button"
        className={classes.skipOrg}
        onClick={() => {
          console.log("//TODO");
        }}
      >
        Not sure? Click here to skip for now
      </button>
    </form>
  );
};

export const EducatorSignupForm = ({ setIsSignup }) => {
  const [isRegister, setIsRegister] = useState(true);
  const [userDetails, setUserDetails] = useState({});

  console.log(isRegister);

  return (
    <div>
      {isRegister ? (
        <EducatorSignupRegisterForm
          setIsSignup={setIsSignup}
          setUserDetails={setUserDetails}
          setIsRegister={setIsRegister}
        />
      ) : (
        <EducatorSignupOrgForm
          userDetails={userDetails}
          setIsSignup={setIsSignup}
          setIsRegister={setIsRegister}
        />
      )}
    </div>
  );
};

export const EducatorLoginForm = ({ setIsSignup }) => {
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
      className={`${classes.form} ${classes.educatorForm} ${classes.loginForm}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1>Log in to your Educator account</h1>
      <Input
        inputProps={{
          className: classes.input,
          placeholder: "Username*",
          type: "text",
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
