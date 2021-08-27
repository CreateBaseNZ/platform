import { useState } from "react";
import { PrimaryButton, SecondaryButton, TertiaryButton } from "../UI/Buttons";
import Img from "../UI/Img";

import classes from "./MyAccount.module.scss";
import OrgForm from "./OrgForm";
import UserDetailsForm, { ChangePasswordForm } from "./UserDetailsForm";

const MyAccount = ({ user, setUser }) => {
  const [changePassword, setChangePassword] = useState(false);
  const [cta, setCta] = useState(false);

  const leaveOrgHandler = () => {
    // TODO leave org
    const error = false;
    if (error) {
      //TODO error
      alert("oops");
    } else {
      //TODO success message
      setUser((state) => ({ ...state, org: undefined }));
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
        {changePassword ? (
          <ChangePasswordForm
            setChangePassword={setChangePassword}
            setUser={setUser}
          />
        ) : (
          <UserDetailsForm user={user} setUser={setUser} />
        )}
        <div className={classes.secondary}>
          <TertiaryButton
            className={classes.changePass}
            style={{ visibility: changePassword && "hidden" }}
            onClick={() => setChangePassword(true)}
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
            <div className={classes.orgCard}>
              <div className={classes.orgDetails}>
                <div className={classes.orgCaption}>Your organisation</div>
                <div className={classes.orgName}>{user.org.name}</div>
                <div className={classes.orgLocation}>
                  {user.org.city}, {user.org.country}
                </div>
                <div className={classes.orgUsers}>
                  <div>
                    <i className="material-icons-outlined">school</i>
                    {user.org.educators} educators
                  </div>
                  <div>
                    <i className="material-icons-outlined">backpack</i>
                    {user.org.learners} learners
                  </div>
                </div>
                <SecondaryButton
                  className={classes.leaveOrg}
                  mainLabel="Leave"
                  onClick={leaveOrgHandler}
                />
              </div>
              <Img
                src="/my-org.svg"
                layout="responsive"
                height={200}
                width={200}
              />
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
