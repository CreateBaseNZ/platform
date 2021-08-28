import { useForm, useFormState } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Input from "../UI/Input";
import { PrimaryButton, TertiaryButton } from "../UI/Buttons";

import classes from "./UserDetailsForm.module.scss";
import blacklist from "../../utils/blacklist";

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
    if (blacklist.some((v) => input.displayName.includes(v))) {
      setError("displayName", {
        type: "manual",
        message: "Display name contains disallowed words",
      });
      frontendError = true;
    }
    // if (blacklist.some((v) => input.username.includes(v))) {
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
      {/* <Input
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
      /> */}
      <Input
        className={classes.input}
        label="Display Name"
        inputProps={{
          // onChange: () => clearErrors("displayName"),
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
