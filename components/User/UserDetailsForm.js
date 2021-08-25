import { useForm, useFormState } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Input from "../UI/Input";
import { PrimaryButton, TertiaryButton } from "../UI/Buttons";

import classes from "./UserDetailsForm.module.scss";
import blacklist from "../../utils/blacklist";

const UserDetailsForm = ({ user }) => {
  const [isSaving, setIsSaving] = useState(false);
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
    mode: "onTouched",
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
    setIsSaving(true);
    if (blacklist.some((v) => input.displayName.includes(v))) {
      // TODO trigger an error
      alert("no can do sir");
    } else {
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
      // TODO change username
      // TODO success handler
      alert("nice, all done");
    }
    setIsSaving(false);
  };

  return (
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
      <div className={classes.btnContainer}>
        <PrimaryButton
          className={classes.submit}
          disabled={isSaving}
          type="submit"
        >
          {isSaving ? (
            <div className={classes.loader} />
          ) : (
            <i className="material-icons-outlined">done</i>
          )}
          {isSaving ? "Saving ..." : "Update"}
        </PrimaryButton>
      </div>
    </form>
  );
};

export default UserDetailsForm;

export const ChangePasswordForm = ({ setChangePassword }) => {
  const [isSaving, setIsSaving] = useState(false);
  const password = useRef({});
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm({ mode: "onTouched" });
  password.current = watch("newPassword", "");

  const onSubmit = async (input) => {
    setIsSaving(true);
    console.log(input); // TODO change password
    setIsSaving(false);
  };

  useEffect(() => {
    touchedFields.confirmPassword && trigger("confirmPassword");
  }, [password.current]);

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        className={classes.input}
        label="Current Password"
        inputProps={{
          type: "password",
          ...register("currentPassword", {
            required: "Please enter your current password",
          }),
        }}
        error={errors.currentPassword}
      />
      <Input
        className={classes.input}
        label="New Password"
        inputProps={{
          type: "password",
          ...register("newPassword", {
            required: "Please enter your new password",
          }),
        }}
        error={errors.newPassword}
      />
      <Input
        className={classes.input}
        label="Confirm Password"
        inputProps={{
          type: "password",
          ...register("confirmPassword", {
            required: "Please confirm your new password",
            validate: (value) =>
              value === password.current ||
              "Confirmation does not match new password",
          }),
        }}
        error={errors.confirmPassword}
      />
      <div className={classes.btnContainer}>
        {!isSaving && (
          <TertiaryButton
            className={classes.cancel}
            type="button"
            onClick={() => setChangePassword(false)}
          >
            Cancel
          </TertiaryButton>
        )}
        <PrimaryButton
          className={classes.submit}
          disabled={isSaving}
          type="submit"
        >
          {isSaving ? (
            <div className={classes.loader} />
          ) : (
            <i className="material-icons-outlined">save</i>
          )}
          {isSaving ? "Saving ..." : "Save"}
        </PrimaryButton>
      </div>
    </form>
  );
};
