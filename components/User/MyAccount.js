import { useForm } from "react-hook-form";
import { PrimaryButton, SecondaryButton, TertiaryButton } from "../UI/Buttons";
import Input from "../UI/Input";
import Img from "../UI/Img";

import axios from "axios";

import classes from "./MyAccount.module.scss";
import { useEffect } from "react";

const MyAccount = ({ user }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      displayName: user.displayName,
      email: user.email,
      username: user.username,
    },
  });

  useEffect(
    () =>
      reset({
        displayName: user.displayName,
        email: user.email,
        username: user.username,
      }),
    [user]
  );

  const onSubmit = async (input) => {
    const date = new Date().toString();
    let data;
    try {
      data = (
        await axios.post("/api/user/data/update", {
          input: { email: input.email, displayName: input.displayName },
          date,
        })
      )["data"];
    } catch (error) {
      data = { status: "error", content: error };
    }
    if (data.status === "error") {
      alert("error!"); // TODO handle error
    }
  };

  return (
    <div className={classes.myAccount}>
      <div className={classes.userDetails}>
        <div className={`${classes.avatar} ${classes[user.type]}`}>
          <i className="material-icons-outlined">
            {user.type === "admin"
              ? "verified_user"
              : user.type === "educator"
              ? "school"
              : "backpack"}
          </i>
        </div>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            className={classes.input}
            label="Email"
            inputProps={{
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
            className={classes.input}
            label="Username"
            inputProps={{
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
            className={classes.input}
            label="Display Name"
            inputProps={{
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
          <PrimaryButton className={classes.submit}>
            <i className="material-icons-outlined">save</i>Save
          </PrimaryButton>
        </form>
        <div className={classes.secondary}>
          <TertiaryButton className={classes.changePass}>
            <i className="material-icons-outlined">password</i>
            Change password
          </TertiaryButton>
          <TertiaryButton className={classes.deleteAcc}>
            <i className="material-icons-outlined">person_remove</i>
            Delete account
          </TertiaryButton>
        </div>
      </div>
      <div className={classes.rightArea}>
        <h1>My Account</h1>
        <div className={classes.ctaContainer}>
          <div className={`${classes.tallCta} ${classes.join}`}>
            <div className={classes.img}>
              <Img src="/join-org.svg" layout="fill" objectFit="contain" />
            </div>
            <p>Has your org already signed up?</p>
            <SecondaryButton children="Join an Org" />
          </div>
          <div className={`${classes.tallCta} ${classes.create}`}>
            <div className={classes.img}>
              <Img src="/create-org.svg" layout="fill" objectFit="contain" />
            </div>
            <p>Signing up your org for the first time?</p>
            <PrimaryButton children="Create an Org" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
