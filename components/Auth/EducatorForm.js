import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { PrimaryButton, SecondaryButton } from "../UI/Buttons";
import Input, { PasswordInput } from "../UI/Input";
import { isBlacklisted } from "../../utils/formValidation";
import { signIn } from "next-auth/client";
import {
  displayNameMinLength,
  displayNamePattern,
  emailPattern,
  passwordMinLength,
  passwordValidate,
  usernameMinLength,
  usernamePattern,
} from "../../utils/formValidation";
import VisualBellContext from "../../store/visual-bell-context";
import classes from "./AuthForm.module.scss";
import router from "next/router";
import axios from "axios";

// EXAMPLE: Create an educator account
// const input = { email: "shellyparkdemo@gmail.com", username: "shellyparkdemo", displayName: "Shelly Park is Cool", password: "Wearec00l!", date: new Date().toString() };
// let data;
// try {
// 	data = (await axios.post("/api/signup/educator", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input }))["data"];
// } catch (error) {
// 	if (error.response) {
// 		data = error.response.data;
// 	} else if (error.request) {
// 		data = { status: "error", content: error.request };
// 	} else {
// 		data = { status: "error", content: error.message };
// 	}
// }
// console.log(data);

const EducatorSignupRegisterForm = ({
  setIsSignup,
  setIsRegister,
  setUserDetails,
}) => {
  const ctx = useContext(VisualBellContext);
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
    if (frontEndError) {
      return setIsLoading(false);
    }
    let data;
    try {
      data = (
        await axios.post("/api/signup/educator", {
          PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
          input: {
            email: input.email,
            username: input.username,
            displayName: input.displayName,
            password: input.password,
            date: new Date().toString(),
          },
        })
      )["data"];
    } catch (error) {
      if (error.response) {
        data = error.response.data;
      } else if (error.request) {
        data = { status: "error", content: error.request };
      } else {
        data = { status: "error", content: error.message };
      }
      ctx.setBell({
        type: "catastrophe",
        message:
          "Oops! Something went wrong, please refresh the page and try again",
      });
      return setIsLoading(false);
    }
    if (data.status === "failed") {
      if (data.content.email) {
        setError("email", {
          type: "manual",
          message: "This email is already taken",
        });
      }
      if (data.content.username) {
        setError("username", {
          type: "manual",
          message: "This username is already taken",
        });
      }
      return setIsLoading(false);
    }

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
    setIsSignup(false);
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
          ...register("orgCode"),
        }}
        error={errors.orgCode}
      /> */}
      <Input
        inputProps={{
          className: classes.input,
          maxLength: 254,
          placeholder: "Email*",
          ...register("email", {
            required: "An email is required",
            pattern: emailPattern,
          }),
        }}
        error={errors.email}
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
      <PasswordInput
        inputProps={{
          className: classes.input,
          placeholder: "Password*",
          ...register("password", {
            required: "Please enter a password",
            minLength: passwordMinLength,
            validate: passwordValidate,
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
    <div style={{ height: "100%" }}>
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
  const ctx = useContext(VisualBellContext);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: window.localStorage.getItem("createbase__remember-me"),
    },
    mode: "onTouched",
  });

  const onSubmit = async (input) => {
    setIsLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      username: input.username,
      password: input.password,
      type: "username",
      PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
    });

    if (result.error) {
      // incorrect login
      setError("username", {
        type: "manual",
        message: result.error,
      });
      setError("password", {
        type: "manual",
        message: result.error,
      });
      return setIsLoading(false);
    }

    // TODO critical error
    // if (criticalError) {
    //   // ctx.setBell({
    //   //   type: "error",
    //   //   message: result.error,
    //   // });
    //   return setIsLoading(false);
    // }

    if (input.remember) {
      window.localStorage.setItem("createbase__remember-me", input.username);
    } else {
      window.localStorage.removeItem("createbase__remember-me");
    }
    setIsLoading(false);
    router.replace("/browse");
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
          maxLength: 254,
          ...register("username", {
            required: "Please enter your username",
          }),
        }}
        error={errors.username}
      />
      <PasswordInput
        inputProps={{
          className: classes.input,
          placeholder: "Password*",
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
          <input type="checkbox" {...register("remember")} />
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
