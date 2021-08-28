import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Input from "../UI/Input";
import { PrimaryButton, TertiaryButton } from "../UI/Buttons";

import classes from "./UserDetailsForm.module.scss";
import {
  displayNameMinLength,
  displayNamePattern,
  emailPattern,
  usernameMinLength,
  usernamePattern,
} from "../../utils/formValidation";

const UserDetailsForm = ({ user, setUser, ctx }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setError,
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
    setIsLoading(true);
    let frontendError = false;
    if (isBlacklisted(input.displayName)) {
      setError("displayName", {
        type: "manual",
        message: "Display name contains disallowed words",
      });
      frontendError = true;
    }
    // if (isBlacklisted(input.username)) {
    //   setError("username", {
    //     type: "manual",
    //     message: "Username contains disallowed words",
    //   });
    //   frontendError = true;
    // }
    if (frontendError) {
      return setIsLoading(false);
    }

    let data1;
    try {
      data1 = (
        await axios.post("/api/user/data/update", {
          input: { email: input.email, displayName: input.displayName },
          date: new Date().toString(),
        })
      )["data"];
    } catch (error) {
      data1 = { status: "error", content: error };
      alert(data1.content + "error error - refresh the page"); // TODO handle error
      return setIsLoading(false);
    }
    if (data1.status === "failed") {
      alert(data1.content + "expected error - please try again");
      return setIsLoading(false);
    }

    // let data2;
    // try {
    //   data2 = (
    //     await axios.post("/api/organisation/license/change-username-admin", {
    //       username: user.username,
    //       newUsername: input.username,
    //       date: new Date().toString(),
    //     })
    //   )["data"];
    // } catch (error) {
    //   data2 = { status: "error", content: error };
    //   ctx.setBell({
    //     type: "error",
    //     message: "Error - please refresh the page and try again",
    //   });
    //   return setIsLoading(false);
    // }
    // if (data2.status === "failed") {
    //   ctx.setBell({
    //     type: "error",
    //     message: "Unexpected error - please try again",
    //   });
    //   return setIsLoading(false);
    // }

    setUser((state) => ({ ...state, ...input }));
    ctx.setBell({
      type: "success",
      message: "Successfully updated details",
    });
    setIsLoading(false);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        className={classes.input}
        label="Email"
        inputProps={{
          maxLength: 254,
          ...register("email", {
            required: "An email is required",
            pattern: emailPattern,
          }),
        }}
        error={errors.email}
      />
      {/* <Input
        className={classes.input}
        label="Username"
        inputProps={{
          maxLength: 254,
          ...register("username", {
            required: "Please enter a username",
            minLength: usernameMinLength,
            pattern: usernamePattern,
          }),
        }}
        error={errors.username}
      /> */}
      <Input
        className={classes.input}
        label="Display Name"
        inputProps={{
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
      <div className={classes.btnContainer}>
        <PrimaryButton
          className={classes.submit}
          isLoading={isLoading}
          type="submit"
          iconLeft={<i className="material-icons-outlined">done</i>}
          loadingLabel="Saving ..."
          mainLabel="Update"
        />
      </div>
    </form>
  );
};

export default UserDetailsForm;

export const ChangePasswordForm = ({ setChangingPassword, ctx }) => {
  const [isSaving, setIsSaving] = useState(false);
  const password = useRef({});
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, touchedFields },
  } = useForm({ mode: "onTouched" });
  password.current = watch("newPassword", "");

  const onSubmit = async (input) => {
    setIsSaving(true);
    // TODO validate password
    console.log(input); // TODO change password

    setIsSaving(false);
    const error = false;
    if (error) {
      // TODO handle error
      alert("nope");
      return;
    }

    setChangingPassword(false);
    ctx.setBell({
      type: "success",
      message: "Successfully changed password",
    });
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
            onClick={() => setChangingPassword(false)}
            mainLabel="Cancel"
          />
        )}
        <PrimaryButton
          className={classes.submit}
          isLoading={isSaving}
          iconLeft={<i className="material-icons-outlined">save</i>}
          type="submit"
          loadingLabel="Saving ..."
          mainLabel="Save"
        />
      </div>
    </form>
  );
};
