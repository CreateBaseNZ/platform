import { useForm } from "react-hook-form";
import { PrimaryButton, TertiaryButton } from "../UI/Buttons";
import Input from "../UI/Input";

import classes from "./MyAccount.module.scss";

const MyAccount = ({ user }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  console.log(watch("username"));

  console.log(errors);

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
                  value: /^[a-zA-Z\-]+$/,
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
      <div className={classes.ctaContainer}>
        <h1>My Account</h1>
      </div>
    </div>
  );
};

export default MyAccount;
