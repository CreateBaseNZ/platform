import { useState } from "react";
import { PrimaryButton, SecondaryButton, TertiaryButton } from "../UI/Buttons";
import Img from "../UI/Img";

import classes from "./MyAccount.module.scss";
import OrgForm from "./OrgForm";
import UserDetailsForm, { ChangePasswordForm } from "./UserDetailsForm";

const MyAccount = ({ user }) => {
  const [changePassword, setChangePassword] = useState(false);
  const [cta, setCta] = useState(false);

  const changePasswordHandler = () => setChangePassword(true);

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
        {changePassword ? (
          <ChangePasswordForm setChangePassword={setChangePassword} />
        ) : (
          <UserDetailsForm user={user} />
        )}
        <div className={classes.secondary}>
          <TertiaryButton
            className={classes.changePass}
            style={{ visibility: changePassword && "hidden" }}
            onClick={changePasswordHandler}
            icon={<i className="material-icons-outlined">password</i>}
            mainLabel="Change password"
          />
          <TertiaryButton
            className={classes.deleteAcc}
            icon={<i className="material-icons-outlined">person_remove</i>}
            mainLabel="Delete account"
          />
        </div>
      </div>
      <div className={classes.rightArea}>
        <h1>My Account</h1>
        <div className={classes.ctaContainer}>
          {cta ? (
            <OrgForm access={user.type} action={cta} setCta={setCta} />
          ) : (
            <>
              <div className={`${classes.tallCta} ${classes.join}`}>
                <div className={classes.img}>
                  <Img src="/join-org.svg" layout="fill" objectFit="contain" />
                </div>
                <p>Has your org already signed up?</p>
                <SecondaryButton
                  mainLabel="Join an Org"
                  onClick={() => setCta("join")}
                />
              </div>
              {user.type !== "learner" && (
                <div className={`${classes.tallCta} ${classes.create}`}>
                  <div className={classes.img}>
                    <Img
                      src="/create-org.svg"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <p>Signing up your org for the first time?</p>
                  <PrimaryButton
                    mainLabel="Create an Org"
                    onClick={() => setCta("create")}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
