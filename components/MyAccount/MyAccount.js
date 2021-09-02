import { useContext, useState } from "react";
import { PrimaryButton, SecondaryButton, TertiaryButton } from "../UI/Buttons";
import VisualBellContext from "../../store/visual-bell-context";
import OrgForm from "./OrgForm";
import UserDetailsForm, { ChangePasswordForm } from "./UserDetailsForm";

import classes from "./MyAccount.module.scss";
import OrgCard from "./OrgCard";
import TallCta from "./TallCta";
import DeleteAccModal from "./DeleteAccModal";

const MyAccount = ({ user, setUser }) => {
  const ctx = useContext(VisualBellContext);
  const [changingPassword, setChangingPassword] = useState(false);
  const [leavingOrg, setLeavingOrg] = useState(false);
  const [deletingAcc, setDeletingAcc] = useState(false);
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
    ctx.setBell({ type: "neutral", message: `Left ${user.org.name}` });
    setUser((state) => ({ ...state, org: undefined }));
    setLeavingOrg(false);
  };

  return (
    <div className={classes.myAccount}>
      <div
        className={classes.userDetails}
        style={{ pointerEvents: "none", opacity: "0.5" }}
      >
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
            ctx={ctx}
          />
        ) : (
          <UserDetailsForm user={user} setUser={setUser} ctx={ctx} />
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
            onClick={() => setDeletingAcc(true)}
          />
        </div>
      </div>
      <div className={classes.rightArea}>
        <h1>My Account</h1>
        <div className={classes.ctaContainer}>
          {user.org ? (
            <OrgCard
              leavingOrg={leavingOrg}
              leaveOrgHandler={leaveOrgHandler}
              setLeavingOrg={setLeavingOrg}
              user={user}
            />
          ) : cta ? (
            <OrgForm
              access={user.type}
              action={cta}
              setCta={setCta}
              setUser={setUser}
            />
          ) : (
            <>
              <TallCta
                className={classes.join}
                imgSrc="/join-org.svg"
                caption="Has your org already signed up?"
                btn={
                  <SecondaryButton
                    mainLabel="Join an Org"
                    onClick={() => setCta("join")}
                  />
                }
              />
              {user.type !== "learner" && (
                <TallCta
                  className={classes.create}
                  imgSrc="/create-org.svg"
                  caption="Signing up your org for the first time?"
                  btn={
                    <PrimaryButton
                      mainLabel="Create an Org"
                      onClick={() => setCta("create")}
                    />
                  }
                />
              )}
            </>
          )}
        </div>
      </div>
      {deletingAcc && <DeleteAccModal setDeletingAcc={setDeletingAcc} />}
    </div>
  );
};

export default MyAccount;