import { useState } from "react";
import { PrimaryButton, SecondaryButton, TertiaryButton } from "../UI/Buttons";
import Img from "../UI/Img";

import classes from "./MyAccount.module.scss";
import OrgForm from "./OrgForm";
import UserDetailsForm, { ChangePasswordForm } from "./UserDetailsForm";

const MyAccount = ({ user, setUser }) => {
  const [changingPassword, setChangingPassword] = useState(false);
  const [leavingOrg, setLeavingOrg] = useState(false);
  const [cta, setCta] = useState(false);

  const leaveOrgHandler = () => {
    // TODO leave org
    const error = false;
    if (error) {
      //TODO error
      alert("oops");
      return setLeavingOrg(false);
    }

    //TODO success message
    setUser((state) => ({ ...state, org: undefined }));
    setLeavingOrg(false);
  };

  console.log(leavingOrg);

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
        {changingPassword ? (
          <ChangePasswordForm
            setChangingPassword={setChangingPassword}
            setUser={setUser}
          />
        ) : (
          <UserDetailsForm user={user} setUser={setUser} />
        )}
        <div className={classes.secondary}>
          <TertiaryButton
            className={classes.changePass}
            style={{ visibility: changingPassword && "hidden" }}
            onClick={() => setChangingPassword(true)}
            iconLeft={<i className="material-icons-outlined">password</i>}
            mainLabel="Change password"
          />
          <TertiaryButton
            className={classes.deleteAcc}
            iconLeft={<i className="material-icons-outlined">person_remove</i>}
            mainLabel="Delete account"
          />
        </div>
      </div>
      <div className={classes.rightArea}>
        <h1>My Account</h1>
        <div className={classes.ctaContainer}>
          {user.org ? (
            <div
              className={`${classes.orgCard} ${
                leavingOrg ? classes.leavingOrg : ""
              }`}
            >
              <div className={classes.orgDetails}>
                <div className={classes.orgCaption}>Your organisation</div>
                <div className={classes.orgName}>{user.org.name}</div>
                <div className={classes.orgLocation}>
                  {user.org.city}, {user.org.country}
                </div>
                <div className={classes.orgUsers}>
                  <div>
                    <i className="material-icons-outlined">school</i>
                    {user.org.educators} educator
                    {(user.org.educators > 1 || user.org.educators === 0) &&
                      "s"}
                  </div>
                  <div>
                    <i className="material-icons-outlined">backpack</i>
                    {user.org.learners} learner
                    {(user.org.learners > 1 || user.org.learners === 0) && "s"}
                  </div>
                </div>
                <SecondaryButton
                  className={classes.leaveOrgBtn}
                  mainLabel="Leave"
                  onClick={() => setLeavingOrg(true)}
                />
              </div>
              <div className={classes.img}>
                <Img
                  src="/my-org.svg"
                  layout="responsive"
                  height={300}
                  width={300}
                />
              </div>
              <div className={classes.leaveConfirm}>
                <div className={classes.leaveH1}>
                  Are you sure you want to leave <span>{user.org.name}</span>?
                </div>
                <div className={classes.leaveH2}>
                  You will not be able to view contents available to the
                  organisation
                </div>
                <div style={{ display: "flex" }}>
                  <SecondaryButton
                    className={classes.leaveCancelBtn}
                    mainLabel="Cancel"
                    onClick={() => setLeavingOrg(false)}
                  />
                  <PrimaryButton
                    className={classes.leaveYesBtn}
                    mainLabel="Yes, I want to leave"
                    onClick={leaveOrgHandler}
                  />
                </div>
              </div>
            </div>
          ) : cta ? (
            <OrgForm
              access={user.type}
              action={cta}
              setCta={setCta}
              setUser={setUser}
            />
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
